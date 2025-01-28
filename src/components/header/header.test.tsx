import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from './header';
import { store } from '../../store';
import { withHistory } from '../../mocks-component';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const headerContainerTestId = 'header-container';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    render(preparedComponent);
    const headerContainer = screen.getByTestId(headerContainerTestId);

    expect(headerContainer).toBeInTheDocument();
  });
});
