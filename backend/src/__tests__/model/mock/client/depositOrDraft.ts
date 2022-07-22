import { Cliente, Prisma } from '@prisma/client';

const depositOrDraft: Cliente = {
  CodCliente: 7,
  Saldo: new Prisma.Decimal(964.87),
  nome: 'test',
  email: 'test@prisma.com',
  senha: 'test123',
};

export default depositOrDraft;
