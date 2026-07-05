import { describe, expect, it, vi } from 'vitest';
import { getMockExchangeRates } from '@/data/mockData';

describe('getMockExchangeRates', () => {
  it('resolves with a timestamp and rates for each base currency', async () => {
    const result = await getMockExchangeRates();

    expect(typeof result.timestamp).toBe('number');
    expect(result.rates.length).toBeGreaterThan(0);

    const bases = result.rates.map((rate) => rate.from);
    expect(bases).toEqual(['USD', 'EUR', 'BRL', 'AED']);
  });

  it('never quotes a currency against itself', async () => {
    const result = await getMockExchangeRates();

    result.rates.forEach(({ from, rates }) => {
      expect(Object.keys(rates)).not.toContain(from);
    });
  });

  it('simulates network latency before resolving', async () => {
    vi.useFakeTimers();
    try {
      const promise = getMockExchangeRates();
      let resolved = false;
      promise.then(() => {
        resolved = true;
      });

      await vi.advanceTimersByTimeAsync(700);
      expect(resolved).toBe(false);

      await vi.advanceTimersByTimeAsync(200);
      expect(resolved).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});
