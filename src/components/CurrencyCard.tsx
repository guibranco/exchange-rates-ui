import React from 'react';
import { ExchangeRate, MatrixCurrency } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CurrencyCardProps {
  data: ExchangeRate;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ data }) => {
  const getCurrencySymbol = (currency: MatrixCurrency) => {
    const symbols: Record<MatrixCurrency, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      BRL: 'R$',
      AED: 'د.إ',
      CHF: 'Fr',
      RUB: '₽',
      BTC: '₿',
    };
    return symbols[currency];
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{data.from}</CardTitle>
        <span className="text-sm text-muted-foreground">Base Currency</span>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(data.rates).map(([currency, rate]) => (
            <div
              key={currency}
              className="flex items-center justify-between p-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <span className="text-foreground">{currency}</span>
                <span className="text-sm text-muted-foreground">
                  {getCurrencySymbol(currency as MatrixCurrency)}
                </span>
              </div>
              <span className="font-medium">
                {rate.toFixed(6)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyCard;