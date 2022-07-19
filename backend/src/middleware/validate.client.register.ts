import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import schemaClientRegister from '../schema/schema.client.register';

async function validateClientRegister(request: Request, _response: Response, next: NextFunction) {
  const { body } = request;

  try {
    await schemaClientRegister.validateAsync(body);
    next();
  } catch (error: any) {
    const isRequired: boolean = error.message.includes('obrigatório');

    error.status = isRequired ? StatusCodes.BAD_REQUEST : StatusCodes.UNPROCESSABLE_ENTITY;

    next(error);
  }
}

export default validateClientRegister;
