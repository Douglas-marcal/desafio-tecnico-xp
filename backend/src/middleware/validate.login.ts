import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import schemaLogin from '../schema/schema.login';

async function validateLogin(request: Request, _response: Response, next: NextFunction) {
  const { body } = request;

  try {
    await schemaLogin.validateAsync(body);
    next();
  } catch (error: any) {
    const isRequired: boolean = error.message.includes('obrigatório');

    error.status = isRequired ? StatusCodes.BAD_REQUEST : StatusCodes.UNPROCESSABLE_ENTITY;

    next(error);
  }
}

export default validateLogin;
