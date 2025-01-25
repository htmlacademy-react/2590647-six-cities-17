import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ErrorPage from './error-page';

vi.mock('../../components/header/header', () => ({
  __esModule: true,
  default: () => <div data-testid="header">Mocked Header</div>,
}));

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();

    expect(screen.getByTestId('error-page')).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: /back/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});