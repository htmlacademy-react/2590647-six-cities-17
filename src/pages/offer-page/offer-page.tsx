import { Offer, OffersNearby} from '../../types/offer';
import { UserComment } from '../../types/comment';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Card from '../../components/card/card';
import Map from '../../components/map/map';
import FormComment from '../../components/form-comment/form-comment';
import CommentsList from '../../components/comments-list/comments-list';
import { STAR_WIDTH_FACTOR, NEARBLY_OFFERS_COUNT } from '../../const';

type OfferPageProps = {
  offers: Offer[];
  userComments: UserComment[];
  nearbyOffers: OffersNearby[];
}

function OfferPage({ offers, userComments, nearbyOffers }: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const offerById = offers.find((offer) => offer.id === id) as Offer;
  const nearbyOffersById = nearbyOffers.find((nearbyOffer) => nearbyOffer.id === id) as OffersNearby;

  return (

    <div className="page">
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerById.pictures.map((picture) => (
                <div className="offer__image-wrapper" key={picture.id}>
                  <img
                    className="offer__image"
                    src={picture.url}
                    alt={'Photo studio'}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerById.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offerById.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(offerById.rating) * STAR_WIDTH_FACTOR}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerById.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offerById.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offerById.bedroomCount} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offerById.maxGuestCount} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offerById.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                  <li className="offer__inside-item">Baby seat</li>
                  <li className="offer__inside-item">Kitchen</li>
                  <li className="offer__inside-item">Dishwasher</li>
                  <li className="offer__inside-item">Cabel TV</li>
                  <li className="offer__inside-item">Fridge</li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offerById.host.avatarURL}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offerById.host.name}</span>
                  <span className="offer__user-status">
                    {offerById.host.isPro ? 'Pro' : null}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offerById.description}
                  </p>
                  <p className="offer__text">
                    {offerById.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{userComments.length}</span>
                </h2>
                <CommentsList userComments={userComments} />
                <FormComment/>

              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={offerById.city} points={nearbyOffersById.offers.map((offer) => offer.location)} selectedPoint={offerById.location} />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {nearbyOffersById.offers.slice(0, NEARBLY_OFFERS_COUNT).map((offer) => (
                  <Card key={offer.id} offer={offer} isOfferPage />
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>

  );
}

export default OfferPage;
