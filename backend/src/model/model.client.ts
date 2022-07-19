import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

import {
  NewClient,
  Order,
  ResponseDeposit,
} from '../interface';

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
  const { Saldo } = credentials;

  return prisma.cliente.create({
    data: {
      ...credentials,
      Saldo: <number>Saldo,
    },
  });
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

async function deposit(order: Order, SaldoAnterior: number): Promise<ResponseDeposit> {
  const { CodCliente, Valor } = order;

  const accountUpdated = await prisma.cliente.update({
    where: {
      CodCliente,
    },
    data: {
      Saldo: Number(SaldoAnterior + Valor),
    },
    select: {
      CodCliente: true,
      Saldo: true,
    },
  });

  const response = {
    ...accountUpdated,
    Saldo: Number(accountUpdated.Saldo),
    ValorAdicionado: Valor,
    SaldoAnterior,
  };

  return response;
}

export default {
  createClient,
  findClientByEmail,
  availableBalance,
  deposit,
};
