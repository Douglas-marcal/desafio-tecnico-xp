import { Cliente, Prisma } from '@prisma/client';

const uniqueClient: Cliente = {
  CodCliente: 3,
  nome: 'Test',
  email: 'test@example.com',
  Saldo: new Prisma.Decimal(692.87),
  senha: 'secret_password123',
};

export default uniqueClient;
