import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { NewClient } from '../interface';
import HttpException from '../shared/http.exception';

dotenv.config();

const prisma = new PrismaClient();

async function findClientByEmail(email: string) {
  return prisma.cliente.findUnique({
    where: {
      email,
    },
  });
}

async function createClient(credentials: NewClient) {
  const { nome, email, senha } = credentials;

  const clientAlreadyRegistered = await findClientByEmail(email);

  if (clientAlreadyRegistered) throw new HttpException('Cliente já registrado', StatusCodes.CONFLICT);

  const hash = await bcrypt.hash(senha, process.env.SALT_ROUNDS || 10);

  return prisma.cliente.create({
    data: {
      nome,
      email,
      senha: hash,
      Saldo: 0,
    },
  });
}

export default {
  createClient,
};
