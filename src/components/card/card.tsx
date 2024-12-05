import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { Path } from '../../const';

type CardProps = {
  offer: Offer;
  onMouseOverCard?: (offerId: string) => void;
  activeOfferId?: string;
  isFavoritePage?: boolean;
  isOfferPage?: boolean;
};

function Card({ offer, onMouseOverCard, activeOfferId, isFavoritePage, isOfferPage }: CardProps): JSX.Element {
  const CardURL = Path.Offer.replace(':id', offer.id);
  const isActive = offer.id === activeOfferId;

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
      onMouseOver={() => onMouseOverCard && onMouseOverCard(offer.id)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={CardURL}>
          <img
            className="place-card__image"
            src={offer.previewPictureURL}
            width={isFavoritePage ? 150 : 260}
            height={isFavoritePage ? 110 : 200}
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
          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={CardURL}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
