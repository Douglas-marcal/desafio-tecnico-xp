import { Ativo, Prisma } from '@prisma/client';
import { Asset, ResponseAsset } from '../../../../interface';

const input: Asset = {
  NomeAtivo: 'TESTING',
  QtdeAtivo: 237,
  Valor: 7.91,
};

const responseDatabase: Ativo = {
  CodAtivo: 15,
  NomeAtivo: 'TESTING',
  QtdeAtivo: 237,
  Valor: new Prisma.Decimal(7.91),
};

const responseAsset: ResponseAsset = {
  CodAtivo: 15,
  NomeAtivo: 'TESTING',
  QtdeAtivo: 237,
  Valor: 7.91,
};

export default {
  input,
  responseDatabase,
  responseAsset,
};
