import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import clientService from '../service/service.client';
import HttpException from '../shared/http.exception';

dotenv.config();

async function createClient(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const clientCreated = await clientService.createClient(body);

  response.status(StatusCodes.CREATED).json(clientCreated);
}

async function clientLogin(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const responseLogin = await clientService.clientLogin(body);

  response.status(StatusCodes.OK).json(responseLogin);
}

async function availableBalance(request: Request, response: Response): Promise<void> {
  const { codCliente } = request.params;
  const { client } = response.locals;

  if (Number(codCliente) !== Number(client.CodCliente)) {
    throw new HttpException('Não é possível consultar saldo de outro cliente.', StatusCodes.UNAUTHORIZED);
  }

  const clientBalance = await clientService.availableBalance(Number(codCliente));

  response.status(StatusCodes.OK).json(clientBalance);
}

async function deposit(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const balanceUpdated = await clientService.deposit(body);

  response.status(StatusCodes.OK).json(balanceUpdated);
}

export default {
  createClient,
  clientLogin,
  availableBalance,
  deposit,
};
