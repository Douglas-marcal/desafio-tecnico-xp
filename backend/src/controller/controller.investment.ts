import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import investmentService from '../service/service.investment';

async function buyAsset(request: Request, response: Response) {
  const { body } = request;

  const assetPurchased = await investmentService.buyOrSellAsset(body, 'buy');

  response.status(StatusCodes.OK).json(assetPurchased);
}

async function sellAsset(request: Request, response: Response) {
  const { body } = request;

  const assetSold = await investmentService.buyOrSellAsset(body, 'sell');

  response.status(StatusCodes.OK).json(assetSold);
}

export default {
  buyAsset,
  sellAsset,
};
