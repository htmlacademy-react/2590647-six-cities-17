import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { postOfferComments, fetchOfferComments } from '../../store/api-actions';
import { selectIsLoadingPostComment } from '../../store/slices/offer-data/selectors';

type CommentFormProbs = {
  offerId: string;
};

const MIN_LENGTH_COMMENT = 50;
const MAX_LENGTH_COMMENT = 300;

function FormComment({ offerId }: CommentFormProbs): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoadingPostComments = useAppSelector(selectIsLoadingPostComment);

  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: Number(event.target.value),
    }));
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      review: event.target.value,
    }));
  };

  const wordCount = formData.review.length;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (wordCount > MAX_LENGTH_COMMENT) {
      toast.error('Review must not exceed 250 words');
      return;
    }

    if (offerId) {
      dispatch(postOfferComments({
        id: offerId,
        comment: formData,
      }))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            dispatch(fetchOfferComments(offerId));
            setFormData({
              rating: 0,
              review: '',
            });
            toast.success('Review published successfully!');
          } else {
            toast.error('Failed to submit review. Please try again.');
          }
        });
    }
  };

  const isSubmitDisabled = isLoadingPostComments || !formData.rating || wordCount < MIN_LENGTH_COMMENT || wordCount > MAX_LENGTH_COMMENT;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              data-testid={`${star}-rating`}
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={formData.rating === star}
              onChange={handleRatingChange}
              disabled={isLoadingPostComments}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={['perfect', 'good', 'not bad', 'badly', 'terribly'][5 - star]}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        data-testid='reviewElement'
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleReviewChange}
        disabled={isLoadingPostComments}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
          <br />
          Maximum <b>300 words</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormComment;
