import { render, screen } from '@testing-library/react';
import CitiesList from './cities-list';
import { Cities } from '../../const';
import { withStore } from '../../mocks-component';
import { makeFakeStore } from '../../mocks';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../components/location-item-link/location-item-link', () => {
  const mockLocationItemLink = () => <>This is mock LocationItemLink</>;
  return {
    default: mockLocationItemLink
  };
});

describe('Component: Cities', () => {
  it('should render correctly', () => {
    const expectedText = 'Cities';
    const locationItemContainerTestId = 'location-item-container';
    const mockCurrentCity = Cities.PARIS.name;
    const citiesLength = Object.keys(Cities).length;
    const { withStoreComponent } = withStore(<CitiesList currentCity={mockCurrentCity} />, makeFakeStore());

    render(
      <MemoryRouter>
        {withStoreComponent}
      </MemoryRouter>
    );
    const locationItems = screen.getAllByTestId(locationItemContainerTestId);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(locationItems.length).toBe(citiesLength);
  });
});
