import { Ativo, Prisma } from '@prisma/client';

const uniqueAsset: Ativo = {
  CodAtivo: 7,
  QtdeAtivo: 357,
  Valor: new Prisma.Decimal(9.71),
  NomeAtivo: 'UPDATE',
};

export default uniqueAsset;
