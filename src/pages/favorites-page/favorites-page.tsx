import { Offer } from '../../types/offer';
import { groupOffersByCity } from '../../utils';
import Card from '../../components/card/card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {

  const groupedOffers = groupOffersByCity(offers);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(groupedOffers).map(([city, offersInCity]) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offersInCity.map((offer) => (
                      <Card key={offer.id} offer={offer} isFavoritePage />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}


export default FavoritesPage;
