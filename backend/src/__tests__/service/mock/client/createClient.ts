import { Cliente, Prisma } from '@prisma/client';
import { NewClient, RegisteredClient } from '../../../../interface';

const input: NewClient = {
  email: 'email@example.com',
  nome: 'Testing',
  senha: 'test1234',
};

const client: Cliente = {
  CodCliente: 3,
  Saldo: new Prisma.Decimal(0),
  email: 'email@example.com',
  nome: 'Testing',
  senha: 'test1234',
};

const output: RegisteredClient = {
  message: 'Cliente registrado.',
  CodCliente: 3,
  email: 'email@example.com',
  Saldo: 0,
};

export default {
  input,
  client,
  output,
};
