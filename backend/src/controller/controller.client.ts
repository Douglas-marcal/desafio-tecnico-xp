import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import clientService from '../service/service.client';

import {
  ClientAssetsFormatted,
  Order,
  OrderResponse, RegisteredClient, ResponseAccountBalance, ResponseLogin,
} from '../interface';

dotenv.config();

async function createClient(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const clientCreated: RegisteredClient = await clientService.createClient(body);

  response.status(StatusCodes.CREATED).json(clientCreated);
}

async function clientLogin(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const responseLogin: ResponseLogin = await clientService.clientLogin(body);

  response.status(StatusCodes.OK).json(responseLogin);
}

async function availableBalance(_request: Request, response: Response): Promise<void> {
  const { CodCliente } = response.locals.client;

  const clientBalance: ResponseAccountBalance = await clientService
    .availableBalance(Number(CodCliente));

  response.status(StatusCodes.OK).json(clientBalance);
}

async function deposit(request: Request, response: Response): Promise<void> {
  const { body } = request;
  const { CodCliente } = response.locals.client;

  const order: Order = {
    ...body,
    CodCliente,
  };

  const balanceUpdated: OrderResponse = await clientService.depositOrDraft(order, 'deposit');

  response.status(StatusCodes.OK).json(balanceUpdated);
}

async function draft(request: Request, response: Response): Promise<void> {
  const { body } = request;
  const { CodCliente } = response.locals.client;

  const order: Order = {
    ...body,
    CodCliente,
  };

  const balanceUpdated: OrderResponse = await clientService.depositOrDraft(order, 'draft');

  response.status(StatusCodes.OK).json(balanceUpdated);
}

async function findAllClientAssets(_request: Request, response: Response): Promise<void> {
  const { CodCliente } = response.locals.client;

  const allAssets: Array<ClientAssetsFormatted> = await clientService
    .findAllClientAssets(Number(CodCliente));

  response.status(StatusCodes.OK).json(allAssets);
}

export default {
  createClient,
  clientLogin,
  availableBalance,
  deposit,
  draft,
  findAllClientAssets,
};
