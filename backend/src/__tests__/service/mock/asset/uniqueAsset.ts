import { Ativo, Prisma } from '@prisma/client';
import { ResponseAsset } from '../../../../interface';

const output: ResponseAsset = {
  CodAtivo: 4,
  NomeAtivo: 'TEST',
  QtdeAtivo: 480,
  Valor: 6.95,
};

const input: Ativo = {
  CodAtivo: 4,
  NomeAtivo: 'TEST',
  QtdeAtivo: 480,
  Valor: new Prisma.Decimal(6.95),
};

export default {
  input,
  output,
};
