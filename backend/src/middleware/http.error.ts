import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../shared/http.exception';

function httpError(error: Error, _request: Request, response: Response, _next: NextFunction): void {
  const { message, status } = error as HttpException;

  response.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
}

export default httpError;
