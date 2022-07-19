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
