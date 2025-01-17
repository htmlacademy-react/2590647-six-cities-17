import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getOfferByID, fetchNearbyOffers, fetchOfferComments } from '../../store/api-actions';
import { selectOfferById, selectIsLoadingOffer, selectOffersNearById, selectIsLoadingNearbyOffer } from '../../store/slices/offer-data/selectors';
import { selectIsAuthorized } from '../../store/slices/authorization/selectors';
import ErrorPage from '../../pages/error-page/error-page';
import Header from '../../components/header/header';
import Loading from '../../pages/loading/loading';
import Card from '../../components/card/card';
import Map from '../../components/map/map';
import FormComment from '../../components/form-comment/form-comment';
import CommentsList from '../../components/comments-list/comments-list';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import { STAR_WIDTH_FACTOR, NEARBLY_OFFERS_COUNT } from '../../const';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getOfferByID(id))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            dispatch(fetchNearbyOffers(id));
            dispatch(fetchOfferComments(id));
          }
        });

    }
  }, [id, dispatch]);

  const isAuthorized = useAppSelector(selectIsAuthorized);
  const offerById = useAppSelector(selectOfferById);
  const isLoadingOffer = useAppSelector(selectIsLoadingOffer);
  const offersNearById = useAppSelector(selectOffersNearById);
  const isLoadingNearbyOffer = useAppSelector(selectIsLoadingNearbyOffer);
  const offersNearBy = offersNearById.slice(0, NEARBLY_OFFERS_COUNT);

  if (isLoadingOffer) {
    return (
      <Loading/>
    );
  }

  if (!offerById) {
    return <ErrorPage />;
  }

  return (

    <div className="page">
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerById.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
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
                <FavoriteButton className="offer" offerId={offerById.id} />
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
                  {offerById.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      { good }
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offerById.host.avatarUrl}
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
                <CommentsList />
                {isAuthorized && <FormComment offerId={offerById.id} />}
              </section>
            </div>
          </div>
          {isLoadingNearbyOffer ? (
            <Loading />
          ) : (
            <>
              <section className="offer__map map">
                <Map
                  city={offerById.city}
                  points={offersNearBy.map((offer) => offer.location)}
                  selectedPoint={offerById.location}
                />
              </section>
              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">
                    Other places in the neighbourhood
                  </h2>
                  <div className="near-places__list places__list">
                    {offersNearBy.map((offer) => (
                      <Card key={offer.id} offer={offer} isOfferPage />
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}
        </section>
      </main>
    </div>

  );
}

export default OfferPage;
