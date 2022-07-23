import { Ativo } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseAsset } from '../interface';
import assetService from '../service/service.asset';
import HttpException from '../shared/http.exception';

async function getAllAssets(_request: Request, response: Response): Promise<void> {
  const assets: Array<ResponseAsset> = await assetService.getAllAssets();

  response.status(StatusCodes.OK).json(assets);
}

async function getByAssetCode(request: Request, response: Response): Promise<void> {
  const { codAtivo } = request.params;

  if (Number.isNaN(Number(codAtivo))) {
    throw new HttpException('Rota não encontrada.', StatusCodes.NOT_FOUND);
  }

  const asset: Ativo | null = await assetService.getByAssetCode(Number(codAtivo));

  if (!asset) throw new HttpException('Ativo não encontrado.', StatusCodes.NOT_FOUND);

  response.status(StatusCodes.OK).json(asset);
}

async function registerAsset(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const registeredAsset: ResponseAsset = await assetService.registerAsset(body);

  response.status(StatusCodes.CREATED).json(registeredAsset);
}

export default {
  getByAssetCode,
  registerAsset,
  getAllAssets,
};
