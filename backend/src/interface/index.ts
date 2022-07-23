import { Prisma } from '@prisma/client';

export interface Credentials {
  email: string;
  senha: string;
}

export interface NewClient extends Credentials {
  nome: string;
  Saldo?: number;
}

export interface GenerateToken {
  CodCliente: number;
  email: string
}

export interface ResponseLogin {
  token: string;
  CodCliente: number;
}

export interface Order {
  CodCliente: number;
  Valor: number;
}

export interface OrderResponse extends Order {
  SaldoAnterior: number;
  SaldoAtual: number;
}

export interface Action {
  deposit: (SaldoAnterior: number, Valor: number) => number
  draft: (SaldoAnterior: number, Valor: number) => number
}

export interface Asset {
  QtdeAtivo: number;
  Valor: number;
  NomeAtivo: string;
}

export interface ResponseAsset extends Asset {
  CodAtivo: number;
}

export interface AssetPurchaseOrder {
  CodCliente: number;
  CodAtivo: number;
  QtdeAtivo: number;
}

export interface AssetInformationToUpdate {
  updatedClientAsset: number;
  order: AssetPurchaseOrder;
  assetName: string;
  newAssetQuantity: number;
}

export interface RegisteredClient {
  message: string;
  CodCliente: number;
  email: string;
  Saldo: number,
}

export interface AccountBalance {
  Saldo: Prisma.Decimal;
  CodCliente: number;
}

export interface ResponseAccountBalance {
  Saldo: number;
  CodCliente: number;
}

export interface ClientAssetsFormatted {
  Valor: number;
  NomeAtivo: string;
  CodCliente: number;
  CodAtivo: number;
  QtdeAtivo: number;
}

export interface AssetPurchased {
  NomeAtivo: string;
  message: string;
  QtdeAtivoNaCorretora: number;
  CodCliente: number;
  CodAtivo: number;
  QtdeAtivo: number;
}
