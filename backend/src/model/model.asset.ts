import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getByAssetCode(assetCode: number) {
  return prisma.ativo.findUnique({
    where: {
      CodAtivo: assetCode,
    },
  });
}

export default {
  getByAssetCode,
};
