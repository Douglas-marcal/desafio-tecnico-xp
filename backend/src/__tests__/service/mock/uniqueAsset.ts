import { Ativo, Prisma } from '@prisma/client';

const uniqueAsset: Ativo = {
  CodAtivo: 4,
  NomeAtivo: 'TEST',
  QtdeAtivo: 480,
  Valor: new Prisma.Decimal(6.95),
};

export default uniqueAsset;
