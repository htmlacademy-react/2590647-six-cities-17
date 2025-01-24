import React from 'react';
import ReactDOM from 'react-dom/client';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import { store } from './store/index';
import { fetchOffersAction, checkLoginStatus } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkLoginStatus());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
