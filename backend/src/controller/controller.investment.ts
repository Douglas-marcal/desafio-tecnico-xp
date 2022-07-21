import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import investmentService from '../service/service.investment';
import HttpException from '../shared/http.exception';

async function buyAsset(request: Request, response: Response) {
  const { body } = request;

  const { client } = response.locals;

  if (Number(body.CodCliente) !== Number(client.CodCliente)) {
    throw new HttpException(
      'Não é possível comprar ativo para outro cliente.',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const assetPurchased = await investmentService.buyOrSellAsset(body, 'buy');

  response.status(StatusCodes.OK).json(assetPurchased);
}

async function sellAsset(request: Request, response: Response) {
  const { body } = request;

  const { client } = response.locals;

  if (Number(body.CodCliente) !== Number(client.CodCliente)) {
    throw new HttpException(
      'Não é possível vender ativo de outro cliente.',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const assetSold = await investmentService.buyOrSellAsset(body, 'sell');

  response.status(StatusCodes.OK).json(assetSold);
}

export default {
  buyAsset,
  sellAsset,
};
