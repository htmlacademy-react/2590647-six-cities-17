import { City } from './types/offer';

export const STAR_WIDTH_FACTOR = 20;

export const COMMENTS_LIMIT = 10;

export const NEARBLY_OFFERS_COUNT = 3;

export const GALERY_IMAGES_COUNT = 6;

export const Cities: { [key: string]: City } = {
  PARIS: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 13
    }
  },
  COLOGNE: {
    name: 'Cologne',
    location: {
      latitude: 50.9375,
      longitude: 6.9603,
      zoom: 13
    }
  },
  BRUSSELS: {
    name: 'Brussels',
    location: {
      latitude: 50.8503,
      longitude: 4.3517,
      zoom: 13
    }
  },
  AMSTERDAM: {
    name: 'Amsterdam',
    location: {
      latitude: 52.3676,
      longitude: 4.9041,
      zoom: 13
    }
  },
  HAMBURG: {
    name: 'Hamburg',
    location: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 13
    }
  },
  DUSSELDORF: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2277,
      longitude: 6.7735,
      zoom: 13
    }
  },
};

export const Path = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id'
} as const;

export const enum LoginStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export const NameSpace = {
  User: 'USER',
  Data: 'DATA',
  Main: 'MAIN',
} as const;

export const Markers = {
  Default: '../public/img/pin.svg',
  Current: '../public/img/pin-active.svg',
} as const;

export enum Sort {
  Popular = 'Popular',
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  Rated = 'Top rated first',
}

export enum ApiRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}
