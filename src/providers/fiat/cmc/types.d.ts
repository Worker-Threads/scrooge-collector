import { Currency } from '../../../entities/fiat.d.ts';

export interface Cmc {
  getTopCurrencies: (limit: number) => Promise<Currency[]>;
}
