import { Prisma } from '@prisma/client';

const uniqueAsset = {
  CodAtivo: 1,
  QtdeAtivo: 600,
  Valor: new Prisma.Decimal(4.57),
  NomeAtivo: 'ABC',
};

export default uniqueAsset;
