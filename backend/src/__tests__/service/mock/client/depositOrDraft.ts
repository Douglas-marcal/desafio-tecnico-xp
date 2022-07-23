import { Prisma } from '@prisma/client';

import {
  AccountBalance,
  Order,
  OrderResponse,
} from '../../../../interface';

const orderUpdated: AccountBalance = {
  CodCliente: 9,
  Saldo: new Prisma.Decimal(740),
};

const deposit: Order = {
  CodCliente: 9,
  Valor: 740,
};

const draft: Order = {
  CodCliente: 9,
  Valor: 990,
};

const orderResponse: OrderResponse = {
  CodCliente: 9,
  SaldoAnterior: 0,
  SaldoAtual: 740,
  Valor: 740,
};

const responseAccountBalance: AccountBalance = {
  CodCliente: 9,
  Saldo: new Prisma.Decimal(0),
};

export default {
  orderUpdated,
  deposit,
  orderResponse,
  responseAccountBalance,
  draft,
};
