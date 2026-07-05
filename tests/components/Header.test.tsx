import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header from '@/components/Header';
import { ThemeProvider } from '@/context/ThemeContext';

function renderHeader(props: Partial<React.ComponentProps<typeof Header>> = {}) {
  const defaultProps: React.ComponentProps<typeof Header> = {
    onRefresh: vi.fn(),
    isLoading: false,
    isPaused: false,
    onTogglePause: vi.fn(),
    countdown: 42,
  };
  const merged = { ...defaultProps, ...props };
  render(
    <ThemeProvider>
      <Header {...merged} />
    </ThemeProvider>,
  );
  return merged;
}

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('shows the countdown value', () => {
    renderHeader({ countdown: 17 });
    expect(screen.getByText(/Next update in: 17s/)).toBeInTheDocument();
  });

  it('calls onRefresh when the refresh button is clicked', async () => {
    const user = userEvent.setup();
    const { onRefresh } = renderHeader();

    await user.click(screen.getByRole('button', { name: 'Refresh rates' }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('disables the refresh button while loading', () => {
    renderHeader({ isLoading: true });
    expect(screen.getByRole('button', { name: 'Refresh rates' })).toBeDisabled();
  });

  it('calls onTogglePause when the pause/play button is clicked', async () => {
    const user = userEvent.setup();
    const { onTogglePause } = renderHeader({ isPaused: false });

    await user.click(screen.getByRole('button', { name: 'Pause auto-refresh' }));
    expect(onTogglePause).toHaveBeenCalledTimes(1);
  });

  it('shows a resume affordance when paused', () => {
    renderHeader({ isPaused: true });
    expect(screen.getByRole('button', { name: 'Resume auto-refresh' })).toBeInTheDocument();
  });

  it('toggles the theme when the theme button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    const themeButton = screen.getByRole('button', { name: 'Switch to dark mode' });
    await user.click(themeButton);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
  });
});
