import { Offer, Point} from '../../types/offer';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Map from '../../components/map/map';
import ListOffers from '../../components/list-offers/list-offers';
import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import OfferListEmpty from '../../components/offer-empty/offer-empty';


type MainPageProps = {
  offers: Offer[];
}

function MainPage({offers}: MainPageProps): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const offerCards = useAppSelector((state)=> state.offer);
  const City = useAppSelector((state) => state.currentCity);
  
  const cityOfferCards = offerCards.filter((offerCard) => offerCard.city.name === City.name);

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
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>&nbsp;
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>
                <ListOffers offers={cityOfferCards} onHandleMouseOffer={handleMouseOffer}></ListOffers>
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
