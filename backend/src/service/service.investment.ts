import { StatusCodes } from 'http-status-codes';
import { Ativo, Ativo_Cliente, Cliente } from '@prisma/client';
import { AssetInformationToUpdate, AssetPurchaseOrder } from '../interface';

import InvestmentModel from '../model/model.investment';
import AssetModel from '../model/model.asset';
import ClientModel from '../model/model.client';

import HttpException from '../shared/http.exception';

export const assetModel = new AssetModel();
export const clientModel = new ClientModel();
export const investmentModel = new InvestmentModel();

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
  const client: Cliente | null = await clientModel.findClientById(CodCliente);

  if (!client) throw new HttpException('Cliente não encontrado.', StatusCodes.NOT_FOUND);
}

async function getAssetIfItExists(CodAtivo: number): Promise<Ativo> {
  const asset: Ativo | null = await assetModel.getByAssetCode(CodAtivo);

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

  const updatedPurchase: Ativo_Cliente = await investmentModel.updatePurchase(orderToUpdate);

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

    const assetAlreadyPurchased: Ativo_Cliente | null = await investmentModel
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

type AvailableOperation = 'buy' | 'sell';

async function buyOrSellAsset(order: AssetPurchaseOrder, action: AvailableOperation) {
  const { CodAtivo, CodCliente, QtdeAtivo } = order;

  await verifyIfClientExists(CodCliente);

  const asset: Ativo = await getAssetIfItExists(CodAtivo);

  const newAssetQuantity: number = await updateAvailableAsset[action](asset, QtdeAtivo, order);

  const assetUpdated: Ativo = await assetModel.updateAsset(CodAtivo, newAssetQuantity);

  const assetAlreadyPurchased: Ativo_Cliente | null = await investmentModel
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

  const purchasedOrder: Ativo_Cliente = await investmentModel.buyNewAsset(order);

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
