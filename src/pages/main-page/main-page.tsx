import { Offer, Point} from '../../types/offer';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectCityOfferCards, selectCurrentCity } from '../../store/selectors';
import { sortOffersByType } from '../../utils';
import Map from '../../components/map/map';
import ListOffers from '../../components/list-offers/list-offers';
import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import OfferListEmpty from '../../components/offer-empty/offer-empty';
import Sorting from '../../components/sorting/sorting';

type MainPageProps = {
  offers: Offer[];
}

function MainPage({offers}: MainPageProps): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const City = useAppSelector(selectCurrentCity);
  const cityOfferCards = useAppSelector(selectCityOfferCards);
  const currentSort = useAppSelector((state) => state.currentSort);
  const sortedOfferCards = sortOffersByType(cityOfferCards, currentSort);

  function handleMouseOffer (pointName: string | null) {
    const currentPoint = offers.find((offer) => offer.location.title === pointName);
    setSelectedPoint(currentPoint?.location);
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${cityOfferCards.length > 0 ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList currentCity={City.name}/>
        <div className="cities">
          <div className={`cities__places-container container  ${cityOfferCards.length > 0 ? '' : 'cities__places-container-empty'}`}>
            {cityOfferCards.length > 0 ?
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOfferCards.length} places to stay in {City.name}</b>
                <Sorting/>
                <ListOffers offers={sortedOfferCards} onHandleMouseOffer={handleMouseOffer}></ListOffers>
              </section> :
              <OfferListEmpty currentCity={City.name}/>}
            <div className="cities__right-section">
              {cityOfferCards.length > 0 ?
                <section className="cities__map map">
                  <Map city={City} points={cityOfferCards.map((offer) => offer.location)} selectedPoint={selectedPoint}/>
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
