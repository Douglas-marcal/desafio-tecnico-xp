import { Ativo } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { Asset, ResponseAsset } from '../interface';
import AssetModel from '../model/model.asset';
import HttpException from '../shared/http.exception';

export const assetModel = new AssetModel();

async function getAllAssets(): Promise<Array<ResponseAsset>> {
  const assets: Array<Ativo> = await assetModel.getAllAssets();

  const assetsFormatted = assets.map((asset) => ({
    ...asset,
    Valor: Number(asset.Valor),
  }));

  return assetsFormatted;
}

function getByAssetCode(assetCode: number): Promise<Ativo | null> {
  return assetModel.getByAssetCode(assetCode);
}

async function registerAsset(asset: Asset): Promise<ResponseAsset> {
  const alreadyExist: Ativo | null = await assetModel.getByAssetName(asset.NomeAtivo);

  const message = 'Não foi possível criar, já existe um ativo com este nome.';

  if (alreadyExist) {
    throw new HttpException(message, StatusCodes.CONFLICT);
  }

  const registeredAsset: Ativo = await assetModel.registerAsset(asset);

  const response: ResponseAsset = {
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
