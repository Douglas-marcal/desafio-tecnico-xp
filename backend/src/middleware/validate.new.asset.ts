import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import schemaNewAsset from '../schema/schema.new.asset';

async function validateNewAssetFields(request: Request, _response: Response, next: NextFunction) {
  const { body } = request;

  try {
    await schemaNewAsset.validateAsync(body);
    next();
  } catch (error: any) {
    const badRequest: boolean = (
      error.message.includes('obrigatório')
      || error.message.includes('permitido')
    );

    error.status = badRequest ? StatusCodes.BAD_REQUEST : StatusCodes.UNPROCESSABLE_ENTITY;

    next(error);
  }
}

export default validateNewAssetFields;
