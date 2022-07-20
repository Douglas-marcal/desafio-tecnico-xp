import { StatusCodes } from 'http-status-codes';
import { Asset, ResponseAsset } from '../interface';
import assetModel from '../model/model.asset';
import HttpException from '../shared/http.exception';

function getAllAssets() {
  return assetModel.getAllAssets();
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
