import { Ativo, Prisma } from '@prisma/client';
import { ResponseAsset } from '../../../../interface';

const input: Array<Ativo> = [
  {
    CodAtivo: 1,
    QtdeAtivo: 600,
    Valor: new Prisma.Decimal(4.57),
    NomeAtivo: 'ABC',
  },
  {
    CodAtivo: 2,
    QtdeAtivo: 900,
    Valor: new Prisma.Decimal(5.56),
    NomeAtivo: 'DEF',
  },
  {
    CodAtivo: 3,
    QtdeAtivo: 800,
    Valor: new Prisma.Decimal(8.14),
    NomeAtivo: 'GHI',
  },
  {
    CodAtivo: 4,
    QtdeAtivo: 700,
    Valor: new Prisma.Decimal(5.67),
    NomeAtivo: 'JKL',
  },
  {
    CodAtivo: 5,
    QtdeAtivo: 750,
    Valor: new Prisma.Decimal(6.34),
    NomeAtivo: 'MNO',
  },
  {
    CodAtivo: 6,
    QtdeAtivo: 950,
    Valor: new Prisma.Decimal(4.97),
    NomeAtivo: 'PQR',
  },
];

const output: Array<ResponseAsset> = [
  {
    CodAtivo: 1,
    QtdeAtivo: 600,
    Valor: 4.57,
    NomeAtivo: 'ABC',
  },
  {
    CodAtivo: 2,
    QtdeAtivo: 900,
    Valor: 5.56,
    NomeAtivo: 'DEF',
  },
  {
    CodAtivo: 3,
    QtdeAtivo: 800,
    Valor: 8.14,
    NomeAtivo: 'GHI',
  },
  {
    CodAtivo: 4,
    QtdeAtivo: 700,
    Valor: 5.67,
    NomeAtivo: 'JKL',
  },
  {
    CodAtivo: 5,
    QtdeAtivo: 750,
    Valor: 6.34,
    NomeAtivo: 'MNO',
  },
  {
    CodAtivo: 6,
    QtdeAtivo: 950,
    Valor: 4.97,
    NomeAtivo: 'PQR',
  },
];

export default {
  input,
  output,
};
