import { UserComment } from '../../types/comment';
import { STAR_WIDTH_FACTOR, COMMENTS_LIMIT } from '../../const';
import { getFormattedDate, formatDateToDateTime, getSortedItemsByDate } from '../../utils';

type CommentListProps = {
  userComments: UserComment[];
}

type CommentProps = {
  userComment: UserComment;
}

function Comment({userComment}: CommentProps): JSX.Element {
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

function CommentsList({userComments}: CommentListProps): JSX.Element {
  const sortedComments = getSortedItemsByDate(userComments, COMMENTS_LIMIT)
    
  return (

    <ul className="reviews__list">
      {sortedComments.map((userComment) => <Comment userComment={userComment} key={userComment.id} />)}
    </ul>

  );
}

export default CommentsList;