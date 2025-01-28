import { render, screen, fireEvent } from '@testing-library/react';
import Sorting from './sorting';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('Component: Sorting', () => {
  it('should render and open sorting options menu', () => {
    render(
      <Provider store={store}>
        <Sorting />
      </Provider>
    );

    const sortingType = screen.getByText(/Sort by/i);
    expect(sortingType).toBeInTheDocument();

    const sortingButton = screen.getByText(/Sort by/i).nextElementSibling as HTMLElement;
    fireEvent.click(sortingButton);

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');
  });

  it('should close menu when clicking outside of the menu', () => {
    render(
      <Provider store={store}>
        <Sorting />
      </Provider>
    );

    const sortingButton = screen.getByText(/Sort by/i).nextElementSibling as HTMLElement;
    fireEvent.click(sortingButton);

    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');

    fireEvent.click(document.body);

    expect(optionsList).not.toHaveClass('places__options--opened');
  });
});
