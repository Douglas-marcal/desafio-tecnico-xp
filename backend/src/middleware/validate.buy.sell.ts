import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import schemaBuySell from '../schema/schema.buy.sell';

async function validateBuyAndSellFields(request: Request, _response: Response, next: NextFunction) {
  const { body } = request;

  try {
    await schemaBuySell.validateAsync(body);
    next();
  } catch (error: any) {
    const isRequired: boolean = (
      error.message.includes('obrigatório')
      || error.message.includes('permitido')
    );

    error.status = isRequired ? StatusCodes.BAD_REQUEST : StatusCodes.UNPROCESSABLE_ENTITY;

    next(error);
  }
}

export default validateBuyAndSellFields;
