import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectIsAuthorized } from '../../store/slices/authorization/selectors';
import { getFavoriteByOfferId } from '../../store/slices/offer-data/selectors';
import { uploadFavoriteStatus } from '../../store/api-actions';
import { Path } from '../../const';

type FavoriteButtonProbs = {
  className: string;
  offerId: string;
}

const OFFER_CLASS_NAME = 'offer';
const OFFER_IMG_WIDTH = 31;
const OFFER_IMG_HEIGHT = 33;
const DEFAULT_IMG_WIDTH = 18;
const DEFAULT_IMG_HEIGHT = 19;

function FavoriteButton({ className, offerId }: FavoriteButtonProbs): JSX.Element {
  const imgWidth = className === OFFER_CLASS_NAME ? OFFER_IMG_WIDTH : DEFAULT_IMG_WIDTH;
  const imgHeight = className === OFFER_CLASS_NAME ? OFFER_IMG_HEIGHT : DEFAULT_IMG_HEIGHT;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const isFavorite = useAppSelector((state) => getFavoriteByOfferId(state, offerId));

  return (
    <button
      className={`${className}__bookmark-button button ${isFavorite && isAuthorized ? `${className}__bookmark-button--active` : ''}`}
      type="button"
      onClick={() => {
        if (isAuthorized) {
          dispatch(uploadFavoriteStatus({offerId, wasFavorite: isFavorite}));
        } else {
          navigate(Path.Login);
        }
      }}
    >
      <svg className={`${className}__bookmark-icon`} width={imgWidth} height={imgHeight}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{isFavorite && isAuthorized ? 'In bookmarks' : 'To bookmarks' }</span>
    </button>
  );
}

export default FavoriteButton;
