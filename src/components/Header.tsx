import React from 'react';
import { RefreshCw, Pause, Play, Sun, Moon } from 'lucide-react';
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
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Exchange Rate Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Next update in: {countdown}s
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onTogglePause}
            >
              {isPaused ? (
                <Play className="h-5 w-5" />
              ) : (
                <Pause className="h-5 w-5" />
              )}
            </Button>
            <div className="h-6 w-px bg-border" />
            <Button
              variant="ghost"
              size="icon"
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
    </header>
  );
};

export default Header;