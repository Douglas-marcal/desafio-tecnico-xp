import { PrismaClient } from '@prisma/client';
import { AssetPurchaseOrder } from '../interface';

const prisma = new PrismaClient();

function buyNewAsset(asset: AssetPurchaseOrder) {
  return prisma.ativo_Cliente.create({
    data: asset,
  });
}

function verifyAssetAlreadyPurchased(CodCliente: number, CodAtivo: number) {
  return prisma.ativo_Cliente.findUnique({
    where: {
      CodCliente_CodAtivo: {
        CodCliente,
        CodAtivo,
      },
    },
  });
}

function updatePurchase(order: AssetPurchaseOrder) {
  const { CodAtivo, CodCliente, QtdeAtivo } = order;

  return prisma.ativo_Cliente.update({
    where: {
      CodCliente_CodAtivo: {
        CodCliente,
        CodAtivo,
      },
    },
    data: {
      QtdeAtivo,
    },
  });
}

export default {
  buyNewAsset,
  verifyAssetAlreadyPurchased,
  updatePurchase,
};
