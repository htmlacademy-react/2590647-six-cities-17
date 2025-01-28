import { MemoryHistory, createMemoryHistory } from 'history';
import { Path } from '../../const';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks-component';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(Path.Favorites);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={Path.Login} element={<span>{expectedText}</span>} />
        <Route path={Path.Favorites} element={
          <PrivateRoute authorizationStatus={false}>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={Path.Login} element={<span>{notExpectedText}</span>} />
        <Route path={Path.Favorites} element={
          <PrivateRoute authorizationStatus>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
