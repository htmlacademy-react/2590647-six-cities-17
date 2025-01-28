import {render, screen} from '@testing-library/react';
import { Offers } from '../../types/offer';
import { makeFakeOffer } from '../../mocks';
import ListOffers from './list-offers';

vi.mock('../../components/card/card', () => {
  const mockCard = () => <div data-testid='card-container'>This is mock Card</div>;
  return {
    default: mockCard
  };
});

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    const cardsListContainerTestId = 'cards-list-container';
    const cardContainerTestId = 'card-container';
    const offers = Array<Offers>(5).fill(makeFakeOffer());
    const cardMouseEnterHandler = vi.fn();

    render(<ListOffers offers={offers} onHandleMouseOffer={cardMouseEnterHandler} />);
    const cardsListContainer = screen.getByTestId(cardsListContainerTestId);
    const cardItems = screen.getAllByTestId(cardContainerTestId);

    expect(cardsListContainer).toBeInTheDocument();
    expect(cardItems.length).toBe(5);
  });
});
