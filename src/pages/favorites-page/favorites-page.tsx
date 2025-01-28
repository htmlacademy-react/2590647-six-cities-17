import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getFavoriteOfferCards, getFavoriteOfferCardsLoading } from '../../store/slices/offer-data/selectors';
import { changeCity } from '../../store/slices/main-process/main-process';
import { groupOffersByCity } from '../../utils';
import Card from '../../components/card/card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Loading from '../loading/loading';
import { Cities, Path } from '../../const';
import { City } from '../../types/offer';

function FavoritesPage(): JSX.Element {
  const favoriteOfferCards = useAppSelector(getFavoriteOfferCards);
  const groupedOffers = groupOffersByCity(favoriteOfferCards);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCityClick = (evt: MouseEvent<HTMLElement>, city: City) => {
    evt.preventDefault();
    dispatch(changeCity(city));
    navigate(Path.Main);
  };

  const isLoadingFavorites = useAppSelector(getFavoriteOfferCardsLoading);

  if (isLoadingFavorites) {
    return (
      <Loading/>
    );
  }

  return (
    <div className={`page ${favoriteOfferCards.length === 0 ? 'page--favorites-empty' : ''}`}>
      <Header />

      <main className={`page__main page__main--favorites ${favoriteOfferCards.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {favoriteOfferCards.length > 0 ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedOffers).map(([cityName, offersInCity]) => {
                  const city = Cities[cityName.toUpperCase()];
                  return (
                    <li key={cityName} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link
                            className="locations__item-link"
                            to="#"
                            onClick={(evt) => handleCityClick(evt, city)}
                          >
                            <span>{city.name}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {offersInCity.map((offer) => (
                          <Card key={offer.id} offer={offer} isFavoritePage />
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section> :
            <FavoritesEmpty />}
        </div>
      </main>

      <Footer />
    </div>
  );
}


export default FavoritesPage;
