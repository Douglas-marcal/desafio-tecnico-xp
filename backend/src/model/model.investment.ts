import { PrismaClient } from '@prisma/client';
import { AssetPurchaseOrder } from '../interface';

const prisma = new PrismaClient();

function buyAsset(asset: AssetPurchaseOrder) {
  return prisma.ativo_Cliente.create({
    data: asset,
  });
}

export default {
  buyAsset,
};
