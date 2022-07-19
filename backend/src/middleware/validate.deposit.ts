import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import schemaDeposit from '../schema/schema.deposit';

async function validateDeposit(request: Request, _response: Response, next: NextFunction) {
  const { body } = request;

  try {
    await schemaDeposit.validateAsync(body);
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

export default validateDeposit;
