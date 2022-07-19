import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

import {
  Credentials,
  NewClient,
  Order,
  ResponseLogin,
} from '../interface';

import HttpException from '../shared/http.exception';
import { generateToken } from './utils/generateToken';

import clientModel from '../model/model.client';

dotenv.config();

const prisma = new PrismaClient();

function findClientByEmail(email: string) {
  return prisma.cliente.findUnique({
    where: {
      email,
    },
  });
}

async function createClient(credentials: NewClient) {
  const { nome, email, senha } = credentials;

  const clientAlreadyRegistered = await findClientByEmail(email);

  if (clientAlreadyRegistered) throw new HttpException('Cliente já registrado', StatusCodes.CONFLICT);

  const hash = await bcrypt.hash(senha, process.env.SALT_ROUNDS || 10);

  return prisma.cliente.create({
    data: {
      nome,
      email,
      senha: hash,
      Saldo: 0,
    },
  });
}

async function clientLogin(credentials: Credentials): Promise<ResponseLogin> {
  const { email, senha } = credentials;

  const client = await findClientByEmail(email);

  if (!client) throw new HttpException('Cliente não existe', StatusCodes.NOT_FOUND);

  const credentialsAreCorrect = await bcrypt.compare(senha, client.senha);

  const clientCredential = {
    CodCliente: client.CodCliente,
    email,
  };

  if (!credentialsAreCorrect) throw new HttpException('Email ou senha inválidos', StatusCodes.UNAUTHORIZED);

  const response = {
    token: generateToken(clientCredential),
    CodCliente: client.CodCliente,
  };

  return response;
}

function availableBalance(CodCliente: number) {
  return prisma.cliente.findUnique({
    where: {
      CodCliente,
    },
    select: {
      CodCliente: true,
      Saldo: true,
    },
  });
}

async function deposit(order: Order) {
  const { CodCliente } = order;

  const accountBalance = await availableBalance(CodCliente);

  if (!accountBalance) throw new HttpException('Cliente não encontrado', StatusCodes.NOT_FOUND);

  return clientModel.deposit(order, Number(accountBalance.Saldo));
}

export default {
  createClient,
  findClientByEmail,
  clientLogin,
  availableBalance,
  deposit,
};
