import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { ExchangeRatesResponse } from './types';
import { getMockExchangeRates } from './data/mockData';
import Header from './components/Header';
import CurrencyCard from './components/CurrencyCard';
import { ThemeProvider } from './context/ThemeContext';

const AUTO_REFRESH_INTERVAL = 60; // seconds

function App() {
  const [data, setData] = useState<ExchangeRatesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState(AUTO_REFRESH_INTERVAL);
  
  const countdownInterval = useRef<number>();
  const autoRefreshTimeout = useRef<number>();

  const fetchRates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getMockExchangeRates();
      setData(response);
      setCountdown(AUTO_REFRESH_INTERVAL);
    } catch {
      setError('Failed to fetch exchange rates');
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdown = useCallback(() => {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
    }
    if (autoRefreshTimeout.current) {
      clearTimeout(autoRefreshTimeout.current);
    }

    countdownInterval.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchRates();
          return AUTO_REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000) as unknown as number;

    autoRefreshTimeout.current = setTimeout(() => {
      fetchRates();
    }, AUTO_REFRESH_INTERVAL * 1000) as unknown as number;
  }, []);

  const handleTogglePause = () => {
    setIsPaused((prev) => {
      if (!prev) {
        // Pausing
        if (countdownInterval.current) {
          clearInterval(countdownInterval.current);
        }
        if (autoRefreshTimeout.current) {
          clearTimeout(autoRefreshTimeout.current);
        }
      } else {
        // Resuming
        startCountdown();
      }
      return !prev;
    });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount; fetchRates is also used directly by the manual refresh button
    fetchRates();
    startCountdown();

    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
      if (autoRefreshTimeout.current) {
        clearTimeout(autoRefreshTimeout.current);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header
          onRefresh={fetchRates}
          isLoading={isLoading}
          isPaused={isPaused}
          onTogglePause={handleTogglePause}
          countdown={countdown}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="glass-panel mb-8 flex items-start gap-3 border-l-4 border-l-destructive p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {isLoading && !data ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
              <div className="relative h-14 w-14">
                <div className="absolute inset-0 rounded-full border-4 border-fuchsia-500/15" />
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-fuchsia-500" />
              </div>
              <p className="animate-pulse text-sm text-muted-foreground">Loading rates...</p>
            </div>
          ) : (
            <div className="grid animate-in fade-in slide-in-from-bottom-4 grid-cols-1 gap-6 duration-500 md:grid-cols-2 lg:grid-cols-4">
              {data?.rates.map((rate) => (
                <CurrencyCard key={rate.from} data={rate} />
              ))}
            </div>
          )}

          {data && (
            <div className="mt-10 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-4 py-1.5 text-xs text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/5">
                <Clock className="h-3.5 w-3.5" />
                Last updated: {new Date(data.timestamp).toLocaleString()}
              </span>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;