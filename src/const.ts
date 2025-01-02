import { City } from './types/offer';

export const STAR_WIDTH_FACTOR = 20;

export const COMMENTS_LIMIT = 10;

export const NEARBLY_OFFERS_COUNT = 3;

export const Cities: { [key: string]: City } = {
  PARIS: {
    name: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12
  },
  COLOGNE: {
    name: 'Cologne',
    latitude: 50.9375,
    longitude: 6.9603,
    zoom: 12
  },
  BRUSSELS: {
    name: 'Brussels',
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: 12
  },
  AMSTERDAM: {
    name: 'Amsterdam',
    latitude: 52.3676,
    longitude: 4.9041,
    zoom: 12
  },
  HAMBURG: {
    name: 'Hamburg',
    latitude: 53.5511,
    longitude: 9.9937,
    zoom: 12
  },
  DUSSELDORF: {
    name: 'Dusseldorf',
    latitude: 51.2277,
    longitude: 6.7735,
    zoom: 12
  },
};

export const Path = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id'
} as const;

export const enum LoginStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UMKNOWN',
}

export const URL_MARKER_DEFAULT =
  '../public/img/pin.svg';

export const URL_MARKER_CURRENT =
  '../public/img/pin-active.svg';

export enum Sort {
  Popular = 'Popular',
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  Rated = 'Top rated first',
}

export const ApiRoute = {
  Offers: '/offers',
  Favorite: '/favorite',
  Login: '/login'
};
