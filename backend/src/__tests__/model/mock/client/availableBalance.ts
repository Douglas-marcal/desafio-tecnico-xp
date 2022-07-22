import { Prisma } from '@prisma/client';

const clientBalance = {
  CodCliente: 7,
  Saldo: new Prisma.Decimal(3457.52),
  nome: 'test',
  email: 'test@prisma.com',
  senha: 'test123',
};

export default clientBalance;
