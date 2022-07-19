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

export interface ResponseDeposit {
  Saldo: number;
  ValorAdicionado: number;
  SaldoAnterior: number;
  CodCliente: number;
}
