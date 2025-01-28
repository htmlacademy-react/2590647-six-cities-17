import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../mocks';
import Card from './card';
import { withHistory } from '../../mocks-component';
import userEvent from '@testing-library/user-event';

vi.mock('../../components/favorite-button/favorite-button', () => {
  const mockFavoriteButton = () => <>This is mock favorite button</>;
  return {
    default: mockFavoriteButton
  };
});

describe('Component: Card', () => {
  it('should render correctly', async () => {
    const cardContainerTestId = 'place-card-container';
    const offer = makeFakeOffer();
    const cardMouseEnterHandler = vi.fn();

    const preparedComponent = withHistory(<Card offer={offer} onHandleMouseOffer={() => cardMouseEnterHandler(offer) as void} />);

    render(preparedComponent);
    const cardContainer = screen.getByTestId(cardContainerTestId);
    await userEvent.hover(cardContainer);

    expect(cardContainer).toBeInTheDocument();
    expect(cardMouseEnterHandler).toBeCalledTimes(1);
  });
});
