import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import assetService from '../service/service.asset';
import HttpException from '../shared/http.exception';

async function getAllAssets(_request: Request, response: Response): Promise<void> {
  const assets = await assetService.getAllAssets();

  response.status(StatusCodes.OK).json(assets);
}

async function getByAssetCode(request: Request, response: Response): Promise<void> {
  const { codAtivo } = request.params;

  if (Number.isNaN(Number(codAtivo))) {
    throw new HttpException('Rota não encontrada', StatusCodes.NOT_FOUND);
  }

  const asset = await assetService.getByAssetCode(Number(codAtivo));

  if (!asset) throw new HttpException('Ativo não encontrado', StatusCodes.NOT_FOUND);

  response.status(StatusCodes.OK).json(asset);
}

async function registerAsset(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const registeredAsset = await assetService.registerAsset(body);

  response.status(StatusCodes.CREATED).json(registeredAsset);
}

export default {
  getByAssetCode,
  registerAsset,
  getAllAssets,
};
