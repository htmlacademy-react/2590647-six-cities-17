import { Link } from 'react-router-dom';
import { Path } from '../../const';
import Header from '../../components/header/header';
import './error-page.css';

function ErrorPage(): JSX.Element {
  return (
    <>
      <Header />
      <section className='not-found' data-testid="error-page">
        <div className="container">
          <div className="not-found__wrapper">
            <div className="not-found__number">
              4<span>0</span>4
            </div>
            <div className="not-found__title">Page <span>Not Found</span></div>
            <div className="not-found__subtitle">go to <Link to={Path.Main} className='not-found__link'>back</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ErrorPage;
