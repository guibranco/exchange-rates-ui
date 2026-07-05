import React from 'react';
import { ExchangeRate, MatrixCurrency } from '../types';
import { cn } from '@/lib/utils';

interface CurrencyCardProps {
  data: ExchangeRate;
}

const CURRENCY_SYMBOLS: Record<MatrixCurrency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  BRL: 'R$',
  AED: 'د.إ',
  CHF: 'Fr',
  RUB: '₽',
  BTC: '₿',
};

const CURRENCY_GRADIENTS: Record<MatrixCurrency, string> = {
  USD: 'from-emerald-400 to-teal-500',
  EUR: 'from-blue-400 to-indigo-500',
  GBP: 'from-purple-400 to-fuchsia-500',
  BRL: 'from-yellow-400 to-lime-500',
  AED: 'from-teal-400 to-cyan-500',
  CHF: 'from-rose-400 to-red-500',
  RUB: 'from-slate-400 to-blue-600',
  BTC: 'from-orange-400 to-amber-500',
};

const CurrencyCard: React.FC<CurrencyCardProps> = ({ data }) => {
  const accent = CURRENCY_GRADIENTS[data.from];

  return (
    <div className="glass-panel group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', accent)} />

      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-lg',
              accent,
            )}
          >
            {CURRENCY_SYMBOLS[data.from]}
          </div>
          <div>
            <h3 className="text-xl font-bold leading-none tracking-tight">{data.from}</h3>
            <span className="text-xs text-muted-foreground">Base currency</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 px-6 pb-6">
        {Object.entries(data.rates).map(([currency, rate]) => (
          <div
            key={currency}
            className="flex items-center justify-between rounded-xl p-2.5 transition-colors duration-200 hover:bg-white/60 dark:hover:bg-white/5"
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'h-2 w-2 rounded-full bg-gradient-to-br',
                  CURRENCY_GRADIENTS[currency as MatrixCurrency],
                )}
              />
              <span className="font-medium text-foreground">{currency}</span>
              <span className="text-xs text-muted-foreground">
                {CURRENCY_SYMBOLS[currency as MatrixCurrency]}
              </span>
            </div>
            <span className="font-mono text-sm font-semibold tabular-nums">
              {rate.toFixed(6)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyCard;
