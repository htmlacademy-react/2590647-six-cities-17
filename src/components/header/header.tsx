import { Link } from 'react-router-dom';
import { store } from '../../store';
import { logoutAction } from '../../store/api-actions';
import { Path, LoginStatus } from '../../const';
import { useAppSelector } from '../../store/hooks';

function Header(): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.authorizationStatus) === LoginStatus.Auth;

  function handleLogoutClick (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    evt.preventDefault();
    store.dispatch(logoutAction());
  }

  return (

    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={Path.Main} className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {isAuthorized ? (
                  <Link to={Path.Favorites} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                ) : (
                  <Link to={Path.Login} className="header__nav-link">
                    <span className="header__signout">Sign in</span>
                  </Link>
                )}
              </li>
              <li className="header__nav-item">
                {isAuthorized && (
                  <Link to={''} className="header__nav-link" onClick={handleLogoutClick}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

  );
}

export default Header;
