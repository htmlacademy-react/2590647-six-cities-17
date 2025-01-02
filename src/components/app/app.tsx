import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Path } from '../../const';
// import { LoginStatus } from '../../const';
import { useAppSelector } from '../../store/hooks';
import MainPage from '../../pages/main-page/main-page';
// import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
// import OfferPage from '../../pages/offer-page/offer-page';
import ErrorPage from '../../pages/error-page/error-page';
// import PrivateRoute from '../private-route/private-route';
import Loading from '../../pages/loading/loading';


function App(): JSX.Element {
  const isLoading = useAppSelector((state) => state.isLoading);

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.Main} element={<MainPage/>} />
        <Route path={Path.Login} element={<LoginPage />} />
        {/* <Route path={Path.Favorites} element={
          <PrivateRoute loginStatus={LoginStatus.Auth}>
            <FavoritesPage/>
          </PrivateRoute>
        }
        /> */}
        {/* <Route path={Path.Offer} element={<OfferPage userComments={userComments}/>} /> */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
