import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { Asset, ResponseAsset } from '../interface';
import { Context } from '../model/context';
import AssetModel from '../model/model.asset';
import HttpException from '../shared/http.exception';

const Context: Context = {
  prisma: new PrismaClient(),
};

const assetModel = new AssetModel(Context);

async function getAllAssets() {
  const assets = await assetModel.getAllAssets();

  const assetsFormatted = assets.map((asset) => ({
    ...asset,
    Valor: Number(asset.Valor),
  }));

  return assetsFormatted;
}

function getByAssetCode(assetCode: number) {
  return assetModel.getByAssetCode(assetCode);
}

async function registerAsset(asset: Asset): Promise<ResponseAsset> {
  const alreadyExist = await assetModel.getByAssetName(asset.NomeAtivo);

  const message = 'Não foi possível criar, já existe um ativo com este nome.';

  if (alreadyExist) {
    throw new HttpException(message, StatusCodes.CONFLICT);
  }

  const registeredAsset = await assetModel.registerAsset(asset);

  const response = {
    ...registeredAsset,
    Valor: Number(registeredAsset.Valor),
  };

  return response;
}

export default {
  getByAssetCode,
  registerAsset,
  getAllAssets,
};
