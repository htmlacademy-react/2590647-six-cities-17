import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Component: Loading', () => {
  it('should render correctly', () => {
    render(<Loading />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
