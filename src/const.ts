export const STAR_WIDTH_FACTOR = 20;

export const COMMENTS_LIMIT = 10;

export const NEARBLY_OFFERS_COUNT = 3;

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
