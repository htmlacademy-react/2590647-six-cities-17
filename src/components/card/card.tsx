import { memo, useMemo } from 'react';
import { Offers, Point } from '../../types/offer';
import { Link } from 'react-router-dom';
import { getUrlById, toUpFirstLetter } from '../../utils';
import { STAR_WIDTH_FACTOR } from '../../const';
import FavoriteButton from '../favorite-button/favorite-button';

type CardProps = {
  offer: Offers;
  onHandleMouseOffer?: (offerId: Point | null) => void;
  activeOfferId?: string;
  isFavoritePage?: boolean;
  isOfferPage?: boolean;
};

function Card({ offer, onHandleMouseOffer, activeOfferId, isFavoritePage, isOfferPage }: CardProps): JSX.Element {
  const cardUrl = getUrlById(offer.id);
  const isActive = offer.id === activeOfferId;
  const offerType = useMemo(() => toUpFirstLetter(offer.type), [offer.type]);

  const DEFAULT_IMG_WIDTH = 260;
  const DEFAULT_IMG_HEIGHT = 210;
  const FAVORITE_IMG_WIDTH = 150;
  const FAVORITE_IMG_HEIGHT = 110;

  let cardClass = '';
  let imageWrapperClass = '';

  if (isFavoritePage) {
    cardClass = 'favorites__card';
    imageWrapperClass = 'favorites__image-wrapper';
  } else if (isOfferPage) {
    cardClass = 'near-places__card';
    imageWrapperClass = 'near-places__image-wrapper';
  } else {
    cardClass = 'cities__card';
    imageWrapperClass = 'cities__image-wrapper';
  }

  const priceClass = isFavoritePage ? 'favorites__price' : 'place-card__price';

  return (
    <article
      className={`${cardClass} place-card ${isActive ? 'place-card--active' : ''}`}
      onMouseEnter={() => {
        if (onHandleMouseOffer) {
          onHandleMouseOffer(offer.location);
        }
      }}
      onMouseLeave={() => {
        if (onHandleMouseOffer) {
          onHandleMouseOffer(null);
        }
      }}
      data-testid='place-card-container'
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={cardUrl}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isFavoritePage ? FAVORITE_IMG_WIDTH : DEFAULT_IMG_WIDTH}
            height={isFavoritePage ? FAVORITE_IMG_HEIGHT : DEFAULT_IMG_HEIGHT}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className={priceClass}>
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton className="place-card" offerId={offer.id} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * STAR_WIDTH_FACTOR}%` }} />
            <span className="visually-hidden">{offer.rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={cardUrl}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offerType}</p>
      </div>
    </article>
  );
}

const CardMemoized = memo(Card, (prevProps, nextProps) => prevProps.offer === nextProps.offer);

export default CardMemoized;

