import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CurrencyCard from '@/components/CurrencyCard';
import { ExchangeRate } from '@/types';

const sampleRate: ExchangeRate = {
  from: 'USD',
  rates: {
    EUR: 0.92,
    BRL: 5.03,
    BTC: 0.000023,
  },
};

describe('CurrencyCard', () => {
  it('renders the base currency', () => {
    render(<CurrencyCard data={sampleRate} />);
    expect(screen.getByRole('heading', { name: 'USD' })).toBeInTheDocument();
  });

  it('renders every target currency with its rate formatted to 6 decimals', () => {
    render(<CurrencyCard data={sampleRate} />);

    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('0.920000')).toBeInTheDocument();

    expect(screen.getByText('BRL')).toBeInTheDocument();
    expect(screen.getByText('5.030000')).toBeInTheDocument();

    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('0.000023')).toBeInTheDocument();
  });

  it('renders the currency symbol for each target currency', () => {
    render(<CurrencyCard data={sampleRate} />);
    expect(screen.getByText('€')).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('₿')).toBeInTheDocument();
  });
});
