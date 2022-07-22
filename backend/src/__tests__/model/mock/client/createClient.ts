import { Cliente, Prisma } from '@prisma/client';
import { NewClient } from '../../../../interface';

const input: NewClient = {
  email: 'newclient@gmail.com',
  nome: 'New Client',
  senha: 'cryptedpassord',
  Saldo: 0,
};

const output: Cliente = {
  CodCliente: 4,
  email: 'newclient@gmail.com',
  nome: 'New Client',
  senha: 'cryptedpassord',
  Saldo: new Prisma.Decimal(0),
};

export default {
  input,
  output,
};
