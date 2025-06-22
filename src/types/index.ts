export type Currency = 'AED' | 'BRL' | 'EUR' | 'USD';
export type MatrixCurrency = Currency | 'BTC' | 'CHF' | 'GBP' | 'RUB';

export interface ExchangeRate {
  from: Currency;
  rates: Record<MatrixCurrency, number>;
}

export interface ExchangeRatesResponse {
  timestamp: number;
  rates: ExchangeRate[];
}