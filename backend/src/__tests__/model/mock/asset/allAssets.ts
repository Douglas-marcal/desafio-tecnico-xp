import { Ativo, Prisma } from '@prisma/client';

const assets: Array<Ativo> = [
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
  {
    CodAtivo: 7,
    QtdeAtivo: 650,
    Valor: new Prisma.Decimal(9.23),
    NomeAtivo: 'STU',
  },
];

export default assets;
