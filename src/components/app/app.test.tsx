import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {MemoryHistory, createMemoryHistory} from 'history';
import {Path, LoginStatus, Cities } from '../../const';
import App from './app';
import { withHistory, withStore } from '../../mocks-component';
import { makeFakeOffer, makeFakeOfferFull, makeFakeStore } from '../../mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      }
    }));
    mockHistory.push(Path.Main);

    render(withStoreComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${Cities.PARIS.name}`, 'i'))).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      },
      DATA: {
        offers: [makeFakeOffer()],
        isOffersLoading: false,
        offer: makeFakeOfferFull(),
        isOfferLoading: false,
        nearBy: [makeFakeOffer()],
        isNearByLoading: false,
        isReviewLoading: false,
        reviews: [],
        PostCommentLoading: false,
        favoriteOfferCards: [],
        favoriteOfferCardsLoading: false,
      }
    }));
    mockHistory.push(Path.Offer);

    render(withStoreComponent);

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      }
    }));
    mockHistory.push(Path.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.NoAuth,
      }
    }));
    mockHistory.push(Path.Login);

    render(withStoreComponent);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
  });

  it('should render "Page404" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    Object.defineProperty(global.window, 'scrollTo', { value: vi.fn() });
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.NoAuth,
      }
    }));
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('Not Found', { exact: false })).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigates to "/favorites" and is not authorized', () => {
    const fakeStoreWithAuthorizedStatus = makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.NoAuth,
      }
    });
    const expectedText = 'Sign in';
    const { withStoreComponent } = withStore(<App/>, fakeStoreWithAuthorizedStatus);
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(Path.Favorites);

    render(withHistoryComponent);

    expect(screen.getByRole('button')).toHaveTextContent(expectedText);
  });
});
