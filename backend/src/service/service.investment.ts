/* eslint-disable camelcase */
import { StatusCodes } from 'http-status-codes';
import { Ativo, Ativo_Cliente } from '@prisma/client';
import { AssetInformationToUpdate, AssetPurchaseOrder } from '../interface';

import investmentModel from '../model/model.investment';
import assetModel from '../model/model.asset';
import clientModel from '../model/model.client';

import HttpException from '../shared/http.exception';

function verifyIfThereIsEnoughAsset(asset: Ativo, QtdeAtivo: number): void {
  if (QtdeAtivo > asset.QtdeAtivo) {
    const message = `Não há ativos suficientes para compra. Ativos disponíveis: ${asset.QtdeAtivo}`;

    throw new HttpException(message, StatusCodes.FORBIDDEN);
  }
}

function verifyIfThereIsEnoughAssetToSell(asset: Ativo_Cliente, QtdeAtivo: number): void {
  if (asset.QtdeAtivo < QtdeAtivo) {
    const message = `Não há ativos suficientes para vender. Seus ativos: ${asset.QtdeAtivo}`;

    throw new HttpException(message, StatusCodes.FORBIDDEN);
  }
}

async function verifyIfClientExists(CodCliente: number): Promise<void> {
  const client = await clientModel.findClientById(CodCliente);

  if (!client) throw new HttpException('Cliente não encontrado.', StatusCodes.NOT_FOUND);
}

async function getAssetIfItExists(CodAtivo: number): Promise<Ativo> {
  const asset = await assetModel.getByAssetCode(CodAtivo);

  if (!asset) throw new HttpException('Ativo não encontrado.', StatusCodes.NOT_FOUND);

  return asset;
}

async function updateExistingAsset(information: AssetInformationToUpdate, action: string) {
  const {
    updatedClientAsset,
    order,
    assetName,
    newAssetQuantity,
  } = information;

  const orderToUpdate = {
    ...order,
    QtdeAtivo: updatedClientAsset,
  };

  const updatedPurchase = await investmentModel.updatePurchase(orderToUpdate);

  const message = action.includes('buy') ? 'Compra realizada com sucesso.' : 'Venda realizada com sucesso.';

  const response = {
    ...updatedPurchase,
    NomeAtivo: assetName,
    message,
    QtdeAtivoNaCorretora: newAssetQuantity,
  };

  return response;
}

const updateAvailableAsset = {
  buy: (asset: Ativo, QtdeAtivo: number) => {
    verifyIfThereIsEnoughAsset(asset, QtdeAtivo);

    return asset.QtdeAtivo - QtdeAtivo;
  },
  sell: async (asset: Ativo, QtdeAtivo: number, order: AssetPurchaseOrder) => {
    const { CodAtivo, CodCliente } = order;

    const assetAlreadyPurchased = await investmentModel
      .verifyAssetAlreadyPurchased(CodCliente, CodAtivo);

    if (!assetAlreadyPurchased) {
      throw new HttpException('Você não possui este ativo em sua carteira.', StatusCodes.FORBIDDEN);
    }

    verifyIfThereIsEnoughAssetToSell(assetAlreadyPurchased, QtdeAtivo);

    return asset.QtdeAtivo + QtdeAtivo;
  },
};

const updateClientAsset = {
  buy: (assetAlreadyPurchased: Ativo_Cliente, QtdeAtivo: number) => (
    assetAlreadyPurchased.QtdeAtivo + QtdeAtivo
  ),
  sell: (assetAlreadyPurchased: Ativo_Cliente, QtdeAtivo: number) => (
    assetAlreadyPurchased.QtdeAtivo - QtdeAtivo
  ),
};

type AvailableOperation = 'buy' | 'sell'

async function buyOrSellAsset(order: AssetPurchaseOrder, action: AvailableOperation) {
  const { CodAtivo, CodCliente, QtdeAtivo } = order;

  await verifyIfClientExists(CodCliente);

  const asset = await getAssetIfItExists(CodAtivo);

  const newAssetQuantity: number = await updateAvailableAsset[action](asset, QtdeAtivo, order);

  const assetUpdated = await assetModel.updateAsset(CodAtivo, newAssetQuantity);

  const assetAlreadyPurchased = await investmentModel
    .verifyAssetAlreadyPurchased(CodCliente, CodAtivo);

  if (assetAlreadyPurchased) {
    const updatedClientAsset: number = updateClientAsset[action](assetAlreadyPurchased, QtdeAtivo);
    const assetName: string = assetUpdated.NomeAtivo;

    const informationToUpdate: AssetInformationToUpdate = {
      updatedClientAsset,
      order,
      assetName,
      newAssetQuantity,
    };

    return updateExistingAsset(informationToUpdate, action);
  }

  const purchasedOrder = await investmentModel.buyNewAsset(order);

  const response = {
    ...purchasedOrder,
    NomeAtivo: assetUpdated.NomeAtivo,
    message: 'Compra realizada com sucesso.',
    QtdeAtivoNaCorretora: newAssetQuantity,
  };

  return response;
}

export default {
  buyOrSellAsset,
};
