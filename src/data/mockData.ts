import { ExchangeRatesResponse } from '../types';

export const getMockExchangeRates = async (): Promise<ExchangeRatesResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    timestamp: Date.now(),
    rates: [
      {
        from: 'USD',
        rates: {
          AED: 3.67,
          BRL: 5.03,
          BTC: 0.000023,
          CHF: 0.89,
          EUR: 0.92,
          GBP: 0.79,
          RUB: 92.50,
        },
      },
      {
        from: 'EUR',
        rates: {
          AED: 3.99,
          BRL: 5.47,
          BTC: 0.000025,
          CHF: 0.97,
          GBP: 0.86,
          RUB: 100.65,
          USD: 1.09,
        },
      },
      {
        from: 'BRL',
        rates: {
          AED: 0.73,
          BTC: 0.0000046,
          CHF: 0.18,
          EUR: 0.18,
          GBP: 0.16,
          RUB: 18.40,
          USD: 0.20,
        },
      },
      {
        from: 'AED',
        rates: {
          BRL: 1.37,
          BTC: 0.0000063,
          CHF: 0.24,
          EUR: 0.25,
          GBP: 0.22,
          RUB: 25.20,
          USD: 0.27,
        },
      },
    ],
  };
};