import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import clientService from '../service/service.client';
import HttpException from '../shared/http.exception';

dotenv.config();

async function createClient(request: Request, response: Response): Promise<void> {
  const { body } = request;

  await clientService.createClient(body);

  const message = {
    message: 'Cliente registrado',
  };

  response.status(StatusCodes.CREATED).json(message);
}

async function loginClient(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const token = await clientService.loginClient(body);

  response.status(StatusCodes.OK).json({ token });
}

async function availableBalance(request: Request, response: Response): Promise<void> {
  const { authorization } = request.headers;

  const { codCliente } = request.params;

  if (!authorization) throw new HttpException('Token não encontrado', StatusCodes.FORBIDDEN);

  // const PRIVATE_KEY = <string>process.env.PRIVATE_KEY;

  // const client = jwt.verify(authorization, PRIVATE_KEY);

  const clientBalance = await clientService.availableBalance(Number(codCliente));

  response.status(StatusCodes.OK).json(clientBalance);
}

export default {
  createClient,
  loginClient,
  availableBalance,
};
