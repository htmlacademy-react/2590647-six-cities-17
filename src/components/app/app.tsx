import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Path, LoginStatus } from '../../const';
import { Offer, OffersNearby } from '../../types/offer';
import { UserComment } from '../../types/comment';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import ErrorPage from '../../pages/error-page/error-page';
import PrivateRoute from '../private-route/private-route';


type AppProps = {
  offers: Offer[];
  userComments: UserComment[];
  nearbyOffers: OffersNearby[];
}

function App({offers, userComments, nearbyOffers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.Main} element={<MainPage offers={offers}/>} />
        <Route path={Path.Login} element={<LoginPage />} />
        <Route path={Path.Favorites} element={
          <PrivateRoute loginStatus={LoginStatus.Auth}>
            <FavoritesPage offers={offers}/>
          </PrivateRoute>
        }
        />
        <Route path={Path.Offer} element={<OfferPage offers={offers} userComments={userComments} nearbyOffers={nearbyOffers}/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
