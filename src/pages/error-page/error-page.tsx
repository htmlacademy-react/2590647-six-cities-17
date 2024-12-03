import Header from '../../components/header/header';
import './error-page.css';

function ErrorPage(): JSX.Element {
  return (
    <>
      <Header/>

      <div className="container">
        <div className="not-found">
          <div className="not-found__title">
            4<span>0</span>4
          </div>
          <div className="not-found__title">Page <span>Not Found</span></div>
          <div className="not-found__subtitle">Back to <a className='not-found__link' href='/'>main</a></div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
