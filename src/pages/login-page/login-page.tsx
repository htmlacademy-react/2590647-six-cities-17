import { FormEvent, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { store } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { LoginStatus, Path } from '../../const';
import Header from '../../components/header/header';

function LoginPage(): JSX.Element {
  const isLoggedIn = useAppSelector((state) => state.authorizationStatus) === LoginStatus.Auth;

  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  function submitHandler (evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (inputEmailRef.current && inputPasswordRef.current) {
      const email = inputEmailRef.current.value;
      const password = inputPasswordRef.current.value;
      store.dispatch(loginAction({email: email, password: password}));
    }
  }

  if (isLoggedIn) {
    return (
      <Navigate to={Path.Main} />
    );
  }

  return (
    <div className="page page--gray page--login">
      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={submitHandler}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={inputEmailRef}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={inputPasswordRef}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default LoginPage;
