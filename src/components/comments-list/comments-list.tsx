import { UserComment } from '../../types/comment';
import { useAppSelector } from '../../store/hooks';
import { STAR_WIDTH_FACTOR, COMMENTS_LIMIT } from '../../const';
import { getFormattedDate, formatDateToDateTime, getSortedItemsByDate } from '../../utils';
import { selectOfferComments, selectIsLoadingComments } from '../../store/selectors';
import Loading from '../../pages/loading/loading';

type CommentProps = {
  userComment: UserComment;
}

function Comment({userComment}: CommentProps): JSX.Element {
  const isLoadingComments = useAppSelector(selectIsLoadingComments);

  if (isLoadingComments) {
    return (
      <Loading/>
    );
  }

  return (

    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={userComment.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{userComment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${Math.round(userComment.rating) * STAR_WIDTH_FACTOR}%` }} />
            <span className="visually-hidden">{userComment.rating}</span>
          </div>
        </div>
        <p className="reviews__text">
          {userComment.comment}
        </p>
        <time className="reviews__time" dateTime={formatDateToDateTime(userComment.date)}>
          {getFormattedDate(userComment.date)}
        </time>
      </div>
    </li>

  );
}

function CommentsList(): JSX.Element {
  const comments = useAppSelector(selectOfferComments);
  const sortedComments = getSortedItemsByDate(comments, COMMENTS_LIMIT);

  return (
    <>
      <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedComments.map((userComment) => <Comment userComment={userComment} key={userComment.id} />)}
      </ul>
    </>
  );
}

export default CommentsList;
