import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mocks-component';
import LoginPage from './login-page';
import { makeFakeStore } from '../../mocks';

vi.mock('../../components/header/header', () => {
  const MockHeader = () => <>This is mock Header</>;
  return {
    default: MockHeader,
  };
});

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    const expectedButtonText = 'Sign in';
    const emailPlaceholder = 'Email';
    const passwordPlaceholder = 'Password';
    const { withStoreComponent } = withStore(<LoginPage />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByRole('button', { name: expectedButtonText })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(emailPlaceholder)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordPlaceholder)).toBeInTheDocument();
  });

  it('should update input fields correctly when user types', async () => {
    const emailPlaceholder = 'Email';
    const passwordPlaceholder = 'Password';
    const testEmail = 'test@example.com';
    const testPassword = 'Password123';
    const { withStoreComponent } = withStore(<LoginPage />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(screen.getByPlaceholderText(emailPlaceholder), testEmail);
    await userEvent.type(screen.getByPlaceholderText(passwordPlaceholder), testPassword);

    expect(screen.getByDisplayValue(testEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testPassword)).toBeInTheDocument();
  });
});
