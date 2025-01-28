import {render, screen} from '@testing-library/react';
import OffersEmpty from './offer-empty';
import { Cities } from '../../const';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const mockCurrentCity = Cities.PARIS.name;
    const favoritesEmptyContainerTestId = 'offers-empty-container';
    const favoritesEmptyStatusText = 'No places to stay available';
    const favoritesEmptyDescriptionText = `We could not find any property available at the moment in ${mockCurrentCity}`;

    render(<OffersEmpty currentCity={mockCurrentCity}/>);
    const favoritesEmptyContainer = screen.getByTestId(favoritesEmptyContainerTestId);

    expect(favoritesEmptyContainer).toBeInTheDocument();
    expect(screen.getByText(favoritesEmptyStatusText)).toBeInTheDocument();
    expect(screen.getByText(favoritesEmptyDescriptionText)).toBeInTheDocument();
  });
});
