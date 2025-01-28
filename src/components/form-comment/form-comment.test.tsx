import {render, screen} from '@testing-library/react';
import { withStore } from '../../mocks-component';
import FormComment from './form-comment';
import { makeFakeReview, makeFakeStore } from '../../mocks';
import { ApiRoute, LoginStatus } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: ReviewsForm', () => {
  it('should render correctly', () => {
    const expectedLabelText = 'Your review';
    const expectedButtonText = 'Submit';
    const offerId = 'some-offer-id';
    const { withStoreComponent } = withStore(<FormComment offerId={offerId} />, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByRole('button')).toHaveTextContent(expectedButtonText);
    expect(screen.getByText(expectedLabelText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should submit button enable when rating', async () => {
    const offerId = 'some-offer-id';
    const expectedReviewValue = 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.';
    const fakeServerReplay = makeFakeReview();
    const reviewElementTestId = 'reviewElement';
    const { withStoreComponent, mockAxiosAdapter } = withStore(<FormComment offerId={offerId} />, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      }
    }));
    mockAxiosAdapter.onPost(ApiRoute.Comments + offerId).reply(200, fakeServerReplay);

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(reviewElementTestId),
      expectedReviewValue,
    );

    const perfectRating = screen.getByTestId('5-rating');
    const goodRating = screen.getByTestId('4-rating');

    await userEvent.click(perfectRating);

    expect(perfectRating).toBeChecked();
    expect(goodRating).not.toBeChecked();

    expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
    screen.getByRole('button').removeAttribute('disabled');
    expect(screen.getByRole('button')).not.toBeDisabled();

    await userEvent.click(screen.getByRole('button'));
  });
});
