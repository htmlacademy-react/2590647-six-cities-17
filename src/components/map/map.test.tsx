import { render } from '@testing-library/react';
import Map from '../../components/map/map';
import { City, Points, Point } from '../../types/offer';
import { withHistory } from '../../mocks-component';
import { makeFakePoint, makeFakeCity } from '../../mocks';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const city: City = makeFakeCity();
    const points: Points = Array(5).fill(null).map(() => makeFakePoint());
    const selectedPoint: Point | undefined = undefined;

    const { container } = render(
      withHistory(<Map city={city} points={points} selectedPoint={selectedPoint} />)
    );

    expect(container.querySelector('.leaflet-container')).toBeInTheDocument();
  });

  it('should render the correct number of markers', () => {
    const city: City = makeFakeCity();
    const points: Points = Array(5).fill(null).map(() => makeFakePoint());
    const selectedPoint: Point | undefined = undefined;

    const { container } = render(
      withHistory(<Map city={city} points={points} selectedPoint={selectedPoint} />)
    );

    const markers = container.querySelectorAll('.leaflet-marker-icon');
    expect(markers.length).toBe(points.length);
  });

  it('should highlight the selected marker', () => {
    const city: City = makeFakeCity();
    const points: Points = Array(5).fill(null).map(() => makeFakePoint());
    const selectedPoint: Point = points[2];

    const { container } = render(
      withHistory(<Map city={city} points={points} selectedPoint={selectedPoint} />)
    );

    const markers = container.querySelectorAll('.leaflet-marker-icon');
    expect(markers.length).toBe(points.length);

    const selectedMarker = Array.from(markers).find((marker) =>
      marker.getAttribute('src')?.includes('pin-active.svg')
    );
    expect(selectedMarker).toBeDefined();
  });
});
