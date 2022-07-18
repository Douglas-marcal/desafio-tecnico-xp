export interface Credentials {
  email: string;
  senha: string;
}

export interface NewClient extends Credentials {
  nome: string;
}

export interface GenerateToken {
  CodCliente: number;
  email: string
}
