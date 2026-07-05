import React from 'react';
import { RefreshCw, Pause, Play, Sun, Moon, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
  countdown: number;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, isLoading, isPaused, onTogglePause, countdown }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 border-b border-white/40 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 shadow-lg shadow-fuchsia-500/20">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
                Exchange Rate Dashboard
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/40 bg-white/50 px-3 py-1.5 text-xs text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/5 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Next update in: {countdown}s
            </div>

            <div className="flex items-center gap-1 rounded-full border border-white/40 bg-white/50 p-1 shadow-sm dark:border-white/10 dark:bg-white/5">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/70 dark:hover:bg-white/10"
                onClick={onRefresh}
                disabled={isLoading}
                aria-label="Refresh rates"
              >
                <RefreshCw
                  className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/70 dark:hover:bg-white/10"
                onClick={onTogglePause}
                aria-label={isPaused ? 'Resume auto-refresh' : 'Pause auto-refresh'}
              >
                {isPaused ? (
                  <Play className="h-5 w-5" />
                ) : (
                  <Pause className="h-5 w-5" />
                )}
              </Button>
              <div className="h-5 w-px bg-border" />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/70 dark:hover:bg-white/10"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
