/* eslint-disable camelcase */
import { Ativo_Cliente, Prisma } from '@prisma/client';

const test: (Ativo_Cliente & {
  ativo: {
      Valor: Prisma.Decimal;
      NomeAtivo: string;
  };
})[] = [
  {
    CodCliente: 7,
    CodAtivo: 3,
    QtdeAtivo: 657,
    ativo: {
      Valor: new Prisma.Decimal(6.47),
      NomeAtivo: 'ABC',
    },

  },
  {
    CodCliente: 7,
    CodAtivo: 5,
    QtdeAtivo: 217,
    ativo: {
      Valor: new Prisma.Decimal(12.87),
      NomeAtivo: 'DEF',
    },
  },
];

export default test;
