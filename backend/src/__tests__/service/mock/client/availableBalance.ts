import { Prisma } from '@prisma/client';
import { AccountBalance, ResponseAccountBalance } from '../../../../interface';

const accountBalance: AccountBalance = {
  CodCliente: 9,
  Saldo: new Prisma.Decimal(4567.28),
};

const responseAccountBalance: ResponseAccountBalance = {
  CodCliente: 9,
  Saldo: 4567.28,
};

export default {
  accountBalance,
  responseAccountBalance,
};
