import { Cliente, Prisma } from '@prisma/client';
import { Credentials } from '../../../../interface';

const client: Cliente = {
  CodCliente: 3,
  nome: 'Tester',
  email: 'tester@tester.com',
  senha: '$2b$10$53iI2lGw9A38ik.4eJxpnuzUdAShcMf9TlX8uaMcMJboMNgVyIEt2',
  Saldo: new Prisma.Decimal(30.53),
};

const credentials: Credentials = {
  email: 'tester@tester.com',
  senha: 'test123',
};

const wrongCredential: Credentials = {
  email: 'tester@tester.com',
  senha: 'test1234',
};

export default {
  client,
  credentials,
  wrongCredential,
};
