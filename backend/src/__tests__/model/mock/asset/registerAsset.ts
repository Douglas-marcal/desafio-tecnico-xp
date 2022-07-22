import { Prisma } from '@prisma/client';
import { Asset } from '../../../../interface';

const input: Asset = {
  QtdeAtivo: 350,
  Valor: 3.78,
  NomeAtivo: 'ENG_HAWAII',
};

const output = {
  CodAtivo: 2,
  QtdeAtivo: 350,
  Valor: new Prisma.Decimal(3.78),
  NomeAtivo: 'ENG_HAWAII',
};

export default {
  input,
  output,
};
