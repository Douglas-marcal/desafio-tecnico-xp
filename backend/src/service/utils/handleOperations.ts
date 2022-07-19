import { Action } from '../../interface';

export const make: Action = {
  deposit: (SaldoAnterior: number, Valor: number): number => SaldoAnterior + Valor,
  draft: (SaldoAnterior: number, Valor: number): number => SaldoAnterior - Valor,
};
