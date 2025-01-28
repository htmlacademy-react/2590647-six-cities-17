import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import FavoriteButton from './favorite-button';
import { Path, LoginStatus } from '../../const';
import { makeFakeStore } from '../../mocks';
import { withHistory, withStore } from '../../mocks-component';


const mockNavigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
});

describe('Component: BookmarkButton', () => {
  it('should render correctly when isFavorite true and user authorized', () => {
    const expectedText = 'To bookmarks';
    const className = 'place-card';
    const offerId = 'some-offer-id';
    const bookmarkButtonTestId = 'bookmark-button-container';
    const { withStoreComponent } = withStore(<FavoriteButton className={className} offerId={offerId} />, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const bookmarkButtonContainer = screen.getByTestId(bookmarkButtonTestId);
    expect(bookmarkButtonContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when isFavorite true and user not authorized', () => {
    const expectedText = 'To bookmarks';
    const className = 'place-card';
    const offerId = 'some-offer-id';
    const bookmarkButtonTestId = 'bookmark-button-container';
    const { withStoreComponent } = withStore(<FavoriteButton className={className} offerId={offerId} />, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.NoAuth,
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const bookmarkButtonContainer = screen.getByTestId(bookmarkButtonTestId);
    expect(bookmarkButtonContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when isFavorite false', () => {
    const expectedText = 'To bookmarks';
    const className = 'place-card';
    const offerId = 'some-offer-id';
    const bookmarkButtonTestId = 'bookmark-button-container';
    const { withStoreComponent } = withStore(<FavoriteButton className={className} offerId={offerId} />, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const bookmarkButtonContainer = screen.getByTestId(bookmarkButtonTestId);
    expect(bookmarkButtonContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should dispatch mockDispatch when user clicked bookmark button', async () => {
    const className = 'place-card';
    const offerId = 'some-offer-id';
    const { withStoreComponent, mockStore } = withStore(<FavoriteButton className={className} offerId={offerId} />, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      }
    }));
    const mockDispatch = vi.spyOn(mockStore, 'dispatch');

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should navigate to login-page when not authorized user clicked bookmark button', async () => {
    const className = 'place-card';
    const offerId = 'some-offer-id';
    const { withStoreComponent, mockStore } = withStore(<FavoriteButton className={className} offerId={offerId} />, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.NoAuth,
      }
    }));
    const mockDispatch = vi.spyOn(mockStore, 'dispatch');

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockNavigate).toHaveBeenCalledWith(Path.Login);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
