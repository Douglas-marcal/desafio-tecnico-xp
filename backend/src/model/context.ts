import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export type Context = {
  prisma: PrismaClient
}

export const prismaContext: Context = {
  prisma: new PrismaClient(),
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => ({
  prisma: mockDeep<PrismaClient>(),
});
