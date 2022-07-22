import { PrismaClient } from '@prisma/client';

import {
  NewClient,
  Order,
} from '../interface';
import { Context } from './context';

const prismaContext = {
  prisma: new PrismaClient(),
};

class ClientModel {
  static context: Context;

  constructor(context: Context = prismaContext) {
    ClientModel.context = context;
  }

  public findClientByEmail(email: string) {
    return ClientModel.context.prisma.cliente.findUnique({
      where: {
        email,
      },
    });
  }

  public findClientById(CodCliente: number) {
    return ClientModel.context.prisma.cliente.findUnique({
      where: {
        CodCliente,
      },
    });
  }

  public async createClient(credentials: NewClient) {
    const { Saldo } = credentials;

    return ClientModel.context.prisma.cliente.create({
      data: {
        ...credentials,
        Saldo: <number>Saldo,
      },
    });
  }

  public availableBalance(CodCliente: number) {
    return ClientModel.context.prisma.cliente.findUnique({
      where: {
        CodCliente,
      },
      select: {
        CodCliente: true,
        Saldo: true,
      },
    });
  }

  public depositOrDraft(order: Order) {
    const {
      CodCliente,
      Valor: NovoSaldo,
    } = order;

    return ClientModel.context.prisma.cliente.update({
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

  public findAllClientAssets(CodCliente: number) {
    return ClientModel.context.prisma.ativo_Cliente.findMany({
      where: {
        CodCliente,
      },
      include: {
        ativo: {
          select: {
            NomeAtivo: true,
            Valor: true,
          },
        },
      },
    });
  }
}

export default ClientModel;
