import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '@/App';
import * as mockDataModule from '@/data/mockData';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a loading state and then renders currency cards once data resolves', async () => {
    render(<App />);

    expect(screen.getByText(/loading rates/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'USD' })).toBeInTheDocument(),
    );
    expect(screen.getByRole('heading', { name: 'EUR' })).toBeInTheDocument();
    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
  });

  it('shows an error message when fetching rates fails', async () => {
    vi.spyOn(mockDataModule, 'getMockExchangeRates').mockRejectedValueOnce(
      new Error('network down'),
    );

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText(/failed to fetch exchange rates/i)).toBeInTheDocument(),
    );
  });

  it('re-fetches rates when the refresh button is clicked', async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(mockDataModule, 'getMockExchangeRates');

    render(<App />);
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'USD' })).toBeInTheDocument(),
    );

    const callsBeforeClick = spy.mock.calls.length;
    await user.click(screen.getByRole('button', { name: 'Refresh rates' }));

    await waitFor(() => expect(spy.mock.calls.length).toBeGreaterThan(callsBeforeClick));
  });
});
