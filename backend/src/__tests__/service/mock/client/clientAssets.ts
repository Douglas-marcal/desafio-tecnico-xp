import { Prisma } from '@prisma/client';
import { ClientAssetsFormatted } from '../../../../interface';

const clientAssets = [
  {
    CodAtivo: 4,
    CodCliente: 4,
    QtdeAtivo: 450,
    ativo: {
      Valor: new Prisma.Decimal(12.67),
      NomeAtivo: 'TEST',
    },
  },
  {
    CodAtivo: 6,
    CodCliente: 4,
    QtdeAtivo: 674,
    ativo: {
      Valor: new Prisma.Decimal(9.97),
      NomeAtivo: 'TESTER',
    },
  },
];

const output: Array<ClientAssetsFormatted> = [
  {
    CodAtivo: 4,
    CodCliente: 4,
    QtdeAtivo: 450,
    Valor: 12.67,
    NomeAtivo: 'TEST',
  },
  {
    CodAtivo: 6,
    CodCliente: 4,
    QtdeAtivo: 674,
    Valor: 9.97,
    NomeAtivo: 'TESTER',
  },
];

export default {
  clientAssets,
  output,
};
