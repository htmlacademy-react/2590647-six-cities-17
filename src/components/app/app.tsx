import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Path } from '../../const'
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import ErrorPage from '../../pages/error-page/error-page';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  rentalQuantity: number;
}

function App({rentalQuantity}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.Main} element={<MainPage rentalQuantity={rentalQuantity} />} />
        <Route path={Path.Login} element={<LoginPage />} />
        <Route path={Path.Favorites} element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }/>
        <Route path={Path.Offer} element={<OfferPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
