import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import HttpException from '../shared/http.exception';

function validateToken(request: Request, response: Response, next: NextFunction): void {
  const { authorization } = request.headers;

  if (!authorization) throw new HttpException('Token não encontrado.', StatusCodes.UNAUTHORIZED);

  try {
    const PRIVATE_KEY = <string>process.env.PRIVATE_KEY;

    const clientDecoded = jwt.verify(authorization, PRIVATE_KEY);

    response.locals.client = clientDecoded;

    next();
  } catch (error: any) {
    error.message = 'Token inválido';

    error.status = StatusCodes.UNAUTHORIZED;

    next(error);
  }
}

export default validateToken;
