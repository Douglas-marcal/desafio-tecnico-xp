import { StatusCodes } from 'http-status-codes';
import { Ativo } from '@prisma/client';
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

async function verifyIfClientExists(CodCliente: number): Promise<void> {
  const client = await clientModel.findClientById(CodCliente);

  if (!client) throw new HttpException('Cliente não encontrado.', StatusCodes.NOT_FOUND);
}

async function getAssetIfItExists(CodAtivo: number): Promise<Ativo> {
  const asset = await assetModel.getByAssetCode(CodAtivo);

  if (!asset) throw new HttpException('Ativo não encontrado.', StatusCodes.NOT_FOUND);

  return asset;
}

async function updateExistingAsset(information: AssetInformationToUpdate) {
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

  const response = {
    ...updatedPurchase,
    NomeAtivo: assetName,
    message: 'Compra realizada com sucesso.',
    QtdeAtivoNaCorretora: newAssetQuantity,
  };

  return response;
}

async function buyAsset(order: AssetPurchaseOrder) {
  const { CodAtivo, CodCliente, QtdeAtivo } = order;

  await verifyIfClientExists(CodCliente);

  const asset = await getAssetIfItExists(CodAtivo);

  verifyIfThereIsEnoughAsset(asset, QtdeAtivo);

  const newAssetQuantity = asset.QtdeAtivo - QtdeAtivo;

  const assetUpdated = await assetModel.updateAsset(CodAtivo, newAssetQuantity);

  const assetAlreadyPurchased = await investmentModel
    .verifyAssetAlreadyPurchased(CodCliente, CodAtivo);

  if (assetAlreadyPurchased) {
    const updatedClientAsset: number = assetAlreadyPurchased.QtdeAtivo + QtdeAtivo;
    const assetName: string = assetUpdated.NomeAtivo;

    const informationToUpdate: AssetInformationToUpdate = {
      updatedClientAsset,
      order,
      assetName,
      newAssetQuantity,
    };

    return updateExistingAsset(informationToUpdate);
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
  buyAsset,
};
