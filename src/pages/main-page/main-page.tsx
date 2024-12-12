import { City, Offer, Point} from '../../types/offer';
import { useState } from 'react';
import Map from '../../components/map/map';
import ListOffers from '../../components/list-offers/list-offers';
import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';

type MainPageProps = {
  rentalQuantity: number;
  offers: Offer[];
}

function MainPage({rentalQuantity, offers}: MainPageProps): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
  const city: City = offers[0].city;

  function handleMouseOffer (pointName: string) {
    const currentPoint = offers.find((offer) => offer.location.title === pointName);

    setSelectedPoint(currentPoint?.location);
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{rentalQuantity} places to stay in Amsterdam</b>
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
              <ListOffers offers={offers} onHandleMouseOffer={handleMouseOffer}></ListOffers>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={city} points={offers.map((offer) => offer.location)} selectedPoint={selectedPoint}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}

export default MainPage;
