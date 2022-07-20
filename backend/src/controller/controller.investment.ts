import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import investmentService from '../service/service.investment';

async function buyAsset(request: Request, response: Response) {
  const { body } = request;

  const assetPurchased = await investmentService.buyAsset(body);

  response.status(StatusCodes.OK).json(assetPurchased);
}

export default {
  buyAsset,
};
