import {
  Ativo, Ativo_Cliente, Cliente, Prisma,
} from '@prisma/client';
import { AssetPurchaseOrder } from '../../../../interface';

const assetFound: Ativo = {
  CodAtivo: 4,
  NomeAtivo: 'ABC',
  QtdeAtivo: 127,
  Valor: new Prisma.Decimal(8.51),
};

const assetUpdated: Ativo = {
  CodAtivo: 4,
  NomeAtivo: 'ABC',
  QtdeAtivo: 117,
  Valor: new Prisma.Decimal(8.51),
};

const order: AssetPurchaseOrder = {
  CodAtivo: 4,
  CodCliente: 3,
  QtdeAtivo: 378,
};

const buyOrder: AssetPurchaseOrder = {
  CodAtivo: 4,
  CodCliente: 3,
  QtdeAtivo: 10,
};

const client: Cliente = {
  CodCliente: 3,
  email: 'test@test.com',
  nome: 'Test',
  Saldo: new Prisma.Decimal(970.08),
  senha: 'test123',
};

const assetPurchased: Ativo_Cliente = {
  CodAtivo: 4,
  CodCliente: 3,
  QtdeAtivo: 10,
};

export default {
  assetFound,
  order,
  client,
  buyOrder,
  assetUpdated,
  assetPurchased,
};
