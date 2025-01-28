import {render, screen} from '@testing-library/react';
import {withStore} from '../../mocks-component';
import CommentsList from './comments-list';
import { makeFakeStore } from '../../mocks';
import { LoginStatus } from '../../const';

vi.mock('../form-comment/form-comment', () => {
  const mockCommentForm = () => <>This is mock Form Comment</>;
  return {
    default: mockCommentForm
  };
});

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const reviewsListContainerTestId = 'offer-comment-container';
    const { withStoreComponent } = withStore(<CommentsList />, makeFakeStore());

    render(withStoreComponent);
    const reviewsListContainer = screen.getByTestId(reviewsListContainerTestId);

    expect(reviewsListContainer).toBeInTheDocument();
  });

  it('should render correctly when user auth', () => {
    const reviewsListContainerTestId = 'offer-comment-container';
    const { withStoreComponent } = withStore(<CommentsList />, makeFakeStore({
      USER: {
        authorizationStatus: LoginStatus.Auth,
      }
    }));

    render(withStoreComponent);

    const reviewsListContainer = screen.getByTestId(reviewsListContainerTestId);

    expect(reviewsListContainer).toBeInTheDocument();
  });

  it('should render correctly when user no auth', () => {
    const { withStoreComponent } = withStore(<CommentsList />, makeFakeStore());

    render(withStoreComponent);

    expect(screen.queryByText('This is mock Form Comment')).not.toBeInTheDocument();
  });
});
