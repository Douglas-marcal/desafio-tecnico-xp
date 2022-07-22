import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

import { Cliente } from '@prisma/client';
import {
  AccountBalance,
  ClientAssetsFormatted,
  Credentials,
  GenerateToken,
  NewClient,
  Order,
  OrderResponse,
  RegisteredClient,
  ResponseAccountBalance,
  ResponseLogin,
} from '../interface';

import HttpException from '../shared/http.exception';
import { generateToken } from './utils/generateToken';

import ClientModel from '../model/model.client';
import { make } from './utils/handleOperations';

type ActionType = 'deposit' | 'draft';

dotenv.config();

export const clientModel = new ClientModel();

async function createClient(credentials: NewClient): Promise<RegisteredClient> {
  const { nome, email, senha } = credentials;

  const clientAlreadyRegistered: Cliente | null = await clientModel.findClientByEmail(email);

  if (clientAlreadyRegistered) {
    throw new HttpException('Cliente já registrado.', StatusCodes.CONFLICT);
  }

  const hash: string = await bcrypt.hash(senha, process.env.SALT_ROUNDS || 10);

  const newClientInformation: NewClient = {
    nome,
    email,
    senha: hash,
    Saldo: 0,
  };

  const clientCreated: Cliente = await clientModel.createClient(newClientInformation);

  const response: RegisteredClient = {
    message: 'Cliente registrado.',
    CodCliente: clientCreated.CodCliente,
    email: clientCreated.email,
    Saldo: Number(clientCreated.Saldo),
  };

  return response;
}

async function clientLogin(credentials: Credentials): Promise<ResponseLogin> {
  const { email, senha } = credentials;

  const client: Cliente | null = await clientModel.findClientByEmail(email);

  if (!client) {
    throw new HttpException('Cliente não existe.', StatusCodes.NOT_FOUND);
  }

  const credentialsAreCorrect: boolean = await bcrypt.compare(senha, client.senha);

  if (!credentialsAreCorrect) {
    throw new HttpException('Email ou senha inválidos.', StatusCodes.FORBIDDEN);
  }

  const clientCredential: GenerateToken = {
    CodCliente: client.CodCliente,
    email,
  };

  const response: ResponseLogin = {
    token: generateToken(clientCredential),
    CodCliente: client.CodCliente,
  };

  return response;
}

async function availableBalance(codCliente: number): Promise<ResponseAccountBalance> {
  const accountBalance: AccountBalance | null = await clientModel.availableBalance(codCliente);

  if (!accountBalance) {
    throw new HttpException('Saldo indisponível.', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const response: ResponseAccountBalance = {
    ...accountBalance,
    Saldo: Number(accountBalance.Saldo),
  };

  return response;
}

async function depositOrDraft(order: Order, action: ActionType): Promise<OrderResponse> {
  const { CodCliente, Valor } = order;

  const accountBalance: ResponseAccountBalance = await availableBalance(CodCliente);

  if (action.includes('draft') && (accountBalance.Saldo < Valor)) {
    throw new HttpException(
      'Saldo insuficiente.',
      StatusCodes.FORBIDDEN,
    );
  }

  const SaldoAnterior: number = accountBalance.Saldo;

  const balanceUpdated: number = make[action](SaldoAnterior, Valor);

  const orderInformation: Order = {
    ...order,
    Valor: balanceUpdated,
  };

  const orderUpdated: AccountBalance = await clientModel.depositOrDraft(orderInformation);

  const response: OrderResponse = {
    ...order,
    SaldoAnterior,
    SaldoAtual: Number(orderUpdated.Saldo),
  };

  return response;
}

async function findAllClientAssets(CodCliente: number): Promise<Array<ClientAssetsFormatted>> {
  const allAssets = await clientModel.findAllClientAssets(CodCliente);

  if (allAssets.length === 0) {
    throw new HttpException('Nenhum ativo encontrado na conta.', StatusCodes.NOT_FOUND);
  }

  const assetsFormatted: Array<ClientAssetsFormatted> = allAssets
    .filter((asset) => asset.QtdeAtivo > 0)
    .map((asset) => {
      const { ativo, ...assetWithoutAtivo } = asset;

      return {
        ...assetWithoutAtivo,
        ...ativo,
        Valor: Number(ativo.Valor),
      };
    });

  return assetsFormatted;
}

export default {
  createClient,
  clientLogin,
  availableBalance,
  depositOrDraft,
  findAllClientAssets,
};
