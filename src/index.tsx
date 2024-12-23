import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { Offers, NearbyOffers } from './mocks/offers';
import { UserComments } from './mocks/comments';
import { store } from './store/index';
import { saveOffers } from './store/action';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(saveOffers(Offers))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers = {Offers} userComments = {UserComments} nearbyOffers = {NearbyOffers}/>
    </Provider>
  </React.StrictMode>
);
