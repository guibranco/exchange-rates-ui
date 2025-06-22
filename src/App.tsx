import React, { useEffect, useState, useCallback, useRef } from 'react';
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
    } catch (err) {
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
      <div className="min-h-screen bg-background">
        <Header 
          onRefresh={fetchRates} 
          isLoading={isLoading} 
          isPaused={isPaused}
          onTogglePause={handleTogglePause}
          countdown={countdown}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="rounded-lg border border-destructive p-4 mb-8 text-destructive">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {isLoading && !data ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-muted-foreground animate-pulse">Loading rates...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data?.rates.map((rate) => (
                <CurrencyCard key={rate.from} data={rate} />
              ))}
            </div>
          )}

          {data && (
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Last updated: {new Date(data.timestamp).toLocaleString()}
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;