import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { Credentials, NewClient } from '../interface';
import HttpException from '../shared/http.exception';
import { generateToken } from './utils/generateToken';

dotenv.config();

const prisma = new PrismaClient();

function findClientByEmail(email: string) {
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

async function loginClient(credentials: Credentials): Promise<string> {
  const { email, senha } = credentials;

  const client = await findClientByEmail(email);

  if (!client) throw new HttpException('Cliente não existe', StatusCodes.NOT_FOUND);

  const credentialsAreCorrect = await bcrypt.compare(senha, client.senha);

  const clientCredential = {
    CodCliente: client.CodCliente,
    email,
  };

  if (!credentialsAreCorrect) throw new HttpException('Email ou senha inválidos', StatusCodes.UNAUTHORIZED);

  return generateToken(clientCredential);
}

function availableBalance(CodCliente: number) {
  return prisma.cliente.findUnique({
    where: {
      CodCliente,
    },
    select: {
      CodCliente: true,
      Saldo: true,
    },
  });
}

export default {
  createClient,
  findClientByEmail,
  loginClient,
  availableBalance,
};
