import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import assetService from '../service/service.asset';
import HttpException from '../shared/http.exception';

async function getByAssetCode(request: Request, response: Response): Promise<void> {
  const { codAtivo } = request.params;

  if (Number.isNaN(Number(codAtivo))) {
    throw new HttpException('Rota não encontrada', StatusCodes.NOT_FOUND);
  }

  const asset = await assetService.getByAssetCode(Number(codAtivo));

  if (!asset) throw new HttpException('Ativo não encontrado', StatusCodes.NOT_FOUND);

  response.status(StatusCodes.OK).json(asset);
}

export default {
  getByAssetCode,
};
