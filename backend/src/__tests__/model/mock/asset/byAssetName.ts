import { Prisma } from '@prisma/client';

const uniqueAsset = {
  CodAtivo: 6,
  QtdeAtivo: 487,
  Valor: new Prisma.Decimal(9.71),
  NomeAtivo: 'BY_NAME',
};

export default uniqueAsset;
