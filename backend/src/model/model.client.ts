import { PrismaClient } from '@prisma/client';

import {
  NewClient,
  Order,
} from '../interface';

const prisma = new PrismaClient();

function findClientByEmail(email: string) {
  return prisma.cliente.findUnique({
    where: {
      email,
    },
  });
}

function findClientById(CodCliente: number) {
  return prisma.cliente.findUnique({
    where: {
      CodCliente,
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

function depositOrDraft(order: Order) {
  const {
    CodCliente,
    Valor: NovoSaldo,
  } = order;

  return prisma.cliente.update({
    where: {
      CodCliente,
    },
    data: {
      Saldo: NovoSaldo,
    },
    select: {
      CodCliente: true,
      Saldo: true,
    },
  });
}

export default {
  createClient,
  findClientByEmail,
  availableBalance,
  depositOrDraft,
  findClientById,
};
