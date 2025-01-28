import { Point} from '../../types/offer';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectCityOfferCards } from '../../store/selectors';
import { selectCurrentCity, selectCurrentSorting } from '../../store/slices/main-process/selectors';
import { sortOffersByType } from '../../utils';
import Map from '../../components/map/map';
import ListOffers from '../../components/list-offers/list-offers';
import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import OfferListEmpty from '../../components/offer-empty/offer-empty';
import Sorting from '../../components/sorting/sorting';

function MainPage(): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const city = useAppSelector(selectCurrentCity);
  const cityOfferCards = useAppSelector(selectCityOfferCards);
  const currentSort = useAppSelector(selectCurrentSorting);
  const sortedOfferCards = sortOffersByType(cityOfferCards, currentSort);

  function handleMouseOffer (point: Point | null) {
    const currentPoint = cityOfferCards.find((offer) => offer.location === point);
    setSelectedPoint(currentPoint?.location);
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${cityOfferCards.length > 0 ? '' : 'page__main--index-empty'}`}>
        <CitiesList currentCity={city.name}/>
        <div className="cities">
          <div className={`cities__places-container container  ${cityOfferCards.length > 0 ? '' : 'cities__places-container--empty'}`}>
            {cityOfferCards.length > 0 ?
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {cityOfferCards.length} {cityOfferCards.length === 1 ? 'place' : 'places'} to stay in {city.name}
                </b>
                <Sorting/>
                <ListOffers offers={sortedOfferCards} onHandleMouseOffer={handleMouseOffer}></ListOffers>
              </section> :
              <OfferListEmpty currentCity={city.name}/>}
            <div className="cities__right-section">
              {cityOfferCards.length > 0 ?
                <section className="cities__map map">
                  <Map city={city} points={cityOfferCards.map((offer) => offer.location)} selectedPoint={selectedPoint}/>
                </section>
                : null}
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default MainPage;
