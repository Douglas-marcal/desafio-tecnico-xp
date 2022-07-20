import { PrismaClient } from '@prisma/client';
import { Asset } from '../interface';

const prisma = new PrismaClient();

function getAllAssets() {
  return prisma.ativo.findMany();
}

function getByAssetCode(assetCode: number) {
  return prisma.ativo.findUnique({
    where: {
      CodAtivo: assetCode,
    },
  });
}

function registerAsset(asset: Asset) {
  return prisma.ativo.create({
    data: asset,
  });
}

function getByAssetName(assetName: string) {
  return prisma.ativo.findUnique({
    where: {
      NomeAtivo: assetName,
    },
  });
}

function updateAsset(CodAtivo: number, QtdeAtivo: number) {
  return prisma.ativo.update({
    where: {
      CodAtivo,
    },
    data: {
      QtdeAtivo,
    },
  });
}

export default {
  getByAssetCode,
  registerAsset,
  getByAssetName,
  getAllAssets,
  updateAsset,
};
