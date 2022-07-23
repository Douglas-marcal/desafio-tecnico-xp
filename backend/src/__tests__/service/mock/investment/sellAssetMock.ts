import {
  Ativo, Ativo_Cliente, Cliente, Prisma,
} from '@prisma/client';
import { AssetPurchaseOrder } from '../../../../interface';

const client: Cliente = {
  CodCliente: 3,
  email: 'test@test.com',
  nome: 'Test',
  Saldo: new Prisma.Decimal(970.08),
  senha: 'test123',
};

const assetFound: Ativo = {
  CodAtivo: 4,
  NomeAtivo: 'ABC',
  QtdeAtivo: 117,
  Valor: new Prisma.Decimal(8.51),
};

const order: AssetPurchaseOrder = {
  CodAtivo: 9,
  CodCliente: 3,
  QtdeAtivo: 10,
};

const assetPurchased: Ativo_Cliente = {
  CodAtivo: 4,
  CodCliente: 3,
  QtdeAtivo: 9,
};

const sellOrder: AssetPurchaseOrder = {
  CodAtivo: 4,
  CodCliente: 3,
  QtdeAtivo: 5,
};

const assetUpdated: Ativo = {
  CodAtivo: 4,
  NomeAtivo: 'ABC',
  QtdeAtivo: 122,
  Valor: new Prisma.Decimal(8.51),
};

const updatedAssetSold: Ativo_Cliente = {
  CodAtivo: 4,
  CodCliente: 3,
  QtdeAtivo: 4,
};

export default {
  client,
  assetFound,
  order,
  assetPurchased,
  sellOrder,
  assetUpdated,
  updatedAssetSold,
};
