import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Offers, NearbyOffers } from './mocks/offers';
import { UserComments } from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers = {Offers} userComments = {UserComments} nearbyOffers = {NearbyOffers}/>
  </React.StrictMode>
);
