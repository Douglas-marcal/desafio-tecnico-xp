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

async function availableBalance(_request: Request, response: Response): Promise<void> {
  const { client } = response.locals;

  const clientBalance = await clientService.availableBalance(Number(client.CodCliente));

  response.status(StatusCodes.OK).json(clientBalance);
}

async function deposit(request: Request, response: Response): Promise<void> {
  const { body } = request;
  const { client } = response.locals;

  if (Number(body.CodCliente) !== Number(client.CodCliente)) {
    throw new HttpException(
      'Não é permitido depositar em uma conta diferente da sua.',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const balanceUpdated = await clientService.depositOrDraft(body, 'deposit');

  response.status(StatusCodes.OK).json(balanceUpdated);
}

async function draft(request: Request, response: Response): Promise<void> {
  const { body } = request;
  const { client } = response.locals;

  if (Number(body.CodCliente) !== Number(client.CodCliente)) {
    throw new HttpException(
      'Não é possível sacar de uma conta diferente da sua.',
      StatusCodes.FORBIDDEN,
    );
  }

  const balanceUpdated = await clientService.depositOrDraft(body, 'draft');

  response.status(StatusCodes.OK).json(balanceUpdated);
}

async function findAllClientAssets(_request: Request, response: Response) {
  const allAssets = await clientService.findAllClientAssets(1);

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
