import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Path } from '../../const';
import { useAppSelector } from '../../store/hooks';
import MainPage from '../../pages/main-page/main-page';
// import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import ErrorPage from '../../pages/error-page/error-page';
// import PrivateRoute from '../private-route/private-route';
import Loading from '../../pages/loading/loading';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App(): JSX.Element {
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (isOffersLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path={Path.Main} element={<MainPage/>} />
        <Route path={Path.Login} element={<LoginPage />} />
        {/* <Route path={Path.Favorites} element={
          <PrivateRoute>
            <FavoritesPage/>
          </PrivateRoute>
        }
        /> */}
        <Route path={Path.Offer} element={<OfferPage/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
