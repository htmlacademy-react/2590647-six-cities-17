import { FormEvent, useRef } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { store } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Path, Cities } from '../../const';
import Header from '../../components/header/header';
import { selectIsAuthorized } from '../../store/slices/authorization/selectors';
import { changeCity } from '../../store/slices/main-process/main-process';

function LoginPage(): JSX.Element {
  const isLoggedIn = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const cityKeys = Object.keys(Cities);

  const randomCityKey = cityKeys[Math.floor(Math.random() * cityKeys.length)];

  const randomCity = Cities[randomCityKey];

  function handleCityClick() {
    dispatch(changeCity(randomCity));
    navigate(Path.Main);
  }

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
                  pattern='^.*(?=.*[a-zA-Z])(?=.*\d).*$'
                  title='Пароль должен содержать как минимум 1 букву и 1 цифру'
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
              <button className="locations__item-link button" onClick={handleCityClick}>
                <span>{randomCity.name}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default LoginPage;
