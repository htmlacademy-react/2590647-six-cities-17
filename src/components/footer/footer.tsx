import { Link } from 'react-router-dom';
import { Path } from '../../const';

function Footer(): JSX.Element {
  return (

    <footer className="footer container" data-testid='footer-container'>
      <Link to={Path.Main} className="footer__logo-link" >
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={64}
          height={33}
        />
      </Link>
    </footer>

  );
}

export default Footer;
