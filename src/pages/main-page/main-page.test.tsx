import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks-component';
import MainPage from './main-page';
import { makeFakeStore, makeFakeOffer } from '../../mocks';
import { Sort } from '../../const';
import { vi } from 'vitest';

vi.mock('../../store/selectors', () => ({
  selectCityOfferCards: vi.fn(() => []),
  selectCurrentCity: vi.fn(() => ({ name: 'Paris' })),
  selectCurrentSorting: vi.fn(() => Sort.Popular),
}));

vi.mock('../../components/header/header', () => {
  const MockHeader = () => <>This is mock Header</>;
  return { default: MockHeader };
});

vi.mock('../../components/cities-list/cities-list', () => {
  const MockCitiesList = ({ currentCity }: { currentCity: string }) => (
    <>This is mock CitiesList with currentCity: {currentCity}</>
  );
  return { default: MockCitiesList };
});

vi.mock('../../components/offer-empty/offer-empty', () => {
  const MockOfferListEmpty = ({ currentCity }: { currentCity: string }) => (
    <>This is mock OfferListEmpty for city: {currentCity}</>
  );
  return { default: MockOfferListEmpty };
});

describe('Component: MainPage', () => {
  it('should render correctly when offers are available', () => {
    const mockOffers = Array.from({ length: 12 }, () => makeFakeOffer());
    const fakeStore = makeFakeStore({
      DATA: {
        offers: mockOffers,
        isOffersLoading: false,
        offer: null,
        isOfferLoading: false,
        nearBy: [],
        isNearByLoading: false,
        isReviewLoading: false,
        reviews: [],
        PostCommentLoading: false,
        favoriteOfferCards: [],
        favoriteOfferCardsLoading: false,
      },
    });

    const { withStoreComponent } = withStore(<MainPage />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('This is mock CitiesList with currentCity: Paris')).toBeInTheDocument();
  });

  it('should render empty state correctly when no offers are available', () => {
    const fakeStore = makeFakeStore({
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
        favoriteOfferCards: [],
        favoriteOfferCardsLoading: false,
      },
    });

    const { withStoreComponent } = withStore(<MainPage />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('This is mock CitiesList with currentCity: Paris')).toBeInTheDocument();
    expect(screen.getByText('This is mock OfferListEmpty for city: Paris')).toBeInTheDocument();
  });
});
