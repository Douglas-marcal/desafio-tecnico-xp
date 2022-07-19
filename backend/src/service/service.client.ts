import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

import {
  Credentials,
  NewClient,
  Order,
  OrderResponse,
  ResponseLogin,
} from '../interface';

import HttpException from '../shared/http.exception';
import { generateToken } from './utils/generateToken';

import clientModel from '../model/model.client';
import { make } from './utils/handleOperations';

dotenv.config();

async function createClient(credentials: NewClient) {
  const { nome, email, senha } = credentials;

  const clientAlreadyRegistered = await clientModel.findClientByEmail(email);

  if (clientAlreadyRegistered) throw new HttpException('Cliente já registrado', StatusCodes.CONFLICT);

  const hash = await bcrypt.hash(senha, process.env.SALT_ROUNDS || 10);

  const newClientInformation = {
    nome,
    email,
    senha: hash,
    Saldo: 0,
  };

  const clientCreated = await clientModel.createClient(newClientInformation);

  const response = {
    message: 'Cliente registrado',
    CodCliente: clientCreated.CodCliente,
    email: clientCreated.email,
    Saldo: Number(clientCreated.Saldo),
  };

  return response;
}

async function clientLogin(credentials: Credentials): Promise<ResponseLogin> {
  const { email, senha } = credentials;

  const client = await clientModel.findClientByEmail(email);

  if (!client) throw new HttpException('Cliente não existe', StatusCodes.NOT_FOUND);

  const credentialsAreCorrect = await bcrypt.compare(senha, client.senha);

  if (!credentialsAreCorrect) throw new HttpException('Email ou senha inválidos', StatusCodes.UNAUTHORIZED);

  const clientCredential = {
    CodCliente: client.CodCliente,
    email,
  };

  const response = {
    token: generateToken(clientCredential),
    CodCliente: client.CodCliente,
  };

  return response;
}

async function availableBalance(codCliente: number) {
  const accountBalance = await clientModel.availableBalance(codCliente);

  const response = {
    ...accountBalance,
    Saldo: Number(accountBalance?.Saldo),
  };

  return response;
}

async function deposit(order: Order): Promise<OrderResponse> {
  const { CodCliente, Valor } = order;

  const accountBalance = await availableBalance(CodCliente);

  const SaldoAnterior = accountBalance.Saldo;

  const balanceUpdated = make.deposit(SaldoAnterior, Valor);

  const orderInformation: Order = {
    ...order,
    Valor: balanceUpdated,
  };

  const orderUpdated = await clientModel.depositOrDraft(orderInformation);

  const response = {
    ...order,
    SaldoAnterior,
    SaldoAtual: Number(orderUpdated.Saldo),
  };

  return response;
}

async function draft(order: Order): Promise<OrderResponse> {
  const { CodCliente, Valor } = order;

  const accountBalance = await availableBalance(CodCliente);

  if (accountBalance.Saldo < Valor) {
    throw new HttpException(
      'Saldo insuficiente.',
      StatusCodes.FORBIDDEN,
    );
  }

  const SaldoAnterior: number = accountBalance.Saldo;

  const balanceUpdated: number = make.draft(SaldoAnterior, Valor);

  const orderInformation: Order = {
    ...order,
    Valor: balanceUpdated,
  };

  const orderUpdated = await clientModel.depositOrDraft(orderInformation);

  const response = {
    ...order,
    SaldoAnterior,
    SaldoAtual: Number(orderUpdated.Saldo),
  };

  return response;
}

export default {
  createClient,
  clientLogin,
  availableBalance,
  deposit,
  draft,
};
