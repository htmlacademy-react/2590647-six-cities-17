import { render, screen } from '@testing-library/react';
import FavoritesPage from './favorites-page';
import { withHistory, withStore } from '../../mocks-component';
import { makeFakeOffer, makeFakeStore } from '../../mocks';
import { LoginStatus } from '../../const';
import { Offers } from '../../types/offer';

vi.mock('../../components/header/header', () => {
  const mockHeader = () => <>This is mock Header</>;
  return {
    default: mockHeader
  };
});

vi.mock('../../components/card/card', () => {
  const mockFavoritesCard = ({ offer }: { offer: Offers }) => (
    <div data-testid="favorite-card">
      This is mock card for {offer.id}
    </div>
  );
  return {
    default: mockFavoritesCard
  };
});

vi.mock('../../components/favorites-empty/favorites-empty', () => {
  const mockFavoritesEmpty = () => <>This is mock FavoritesEmpty</>;
  return {
    default: mockFavoritesEmpty
  };
});

describe('Component: FavoritePage', () => {
  it('should render correctly with full offers', () => {
    const expectedH1Text = 'Saved listing';
    const mockOffers = Array<Offers>(12).fill(makeFakeOffer()).map((offer, index) => ({
      ...offer,
      id: String(index + 1),
    }));

    const { withStoreComponent } = withStore(<FavoritesPage />, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      },
      DATA: {
        offers: [],
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        nearBy: [],
        isNearByLoading: false,
        isReviewLoading: false,
        reviews: [],
        PostCommentLoading: false,
        favoriteOfferCards: mockOffers,
        favoriteOfferCardsLoading: false,
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedH1Text)).toBeInTheDocument();

    const mockCards = screen.getAllByTestId('favorite-card');
    expect(mockCards.length).toBe(mockOffers.length);

    mockCards.forEach((card, index) => {
      expect(card).toHaveTextContent(`This is mock card for ${index + 1}`);
    });
  });

  it('should render correctly with empty offers', () => {
    const notExpectedH1Text = 'Saved listing';
    const expectedFavoritesEmptyText = 'This is mock FavoritesEmpty';
    const { withStoreComponent } = withStore(<FavoritesPage />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByText(notExpectedH1Text)).not.toBeInTheDocument();
    expect(screen.getByText(expectedFavoritesEmptyText)).toBeInTheDocument();
  });
});
