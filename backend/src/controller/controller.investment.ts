import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AssetPurchased } from '../interface';
import investmentService from '../service/service.investment';

async function buyAsset(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const { CodCliente } = response.locals.client;

  const order = {
    ...body,
    CodCliente,
  };

  const assetPurchased: AssetPurchased = await investmentService.buyOrSellAsset(order, 'buy');

  response.status(StatusCodes.OK).json(assetPurchased);
}

async function sellAsset(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const { CodCliente } = response.locals.client;

  const order = {
    ...body,
    CodCliente,
  };

  const assetSold: AssetPurchased = await investmentService.buyOrSellAsset(order, 'sell');

  response.status(StatusCodes.OK).json(assetSold);
}

export default {
  buyAsset,
  sellAsset,
};
