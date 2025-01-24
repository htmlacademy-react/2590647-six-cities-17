import {system, name, internet, lorem} from 'faker';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {UserData} from './types/user';
import {Offers, Offer, City} from './types/offer';
import {State} from './types/state';
import {UserComment} from './types/comment';
import {createAPI} from './services/api';
import { LoginStatus, Sort, Cities } from './const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeUserData = (): UserData => ({
  name: name.title(),
  avatarUrl: system.filePath(),
  isPro: false,
  email: internet.email(),
  token: 'secret'
} as UserData);

export const makeFakeImagesData = (): string[] => Array<string>(10).fill(system.filePath());

export const makeFakeReview = (): UserComment => ({
  id: Date.now().toString(),
  comment: lorem.lines(1),
  date: '2024-11-05T21:00:00.490Z',
  rating: Math.floor(Math.random() * 5 + 1),
  user: makeFakeUserData()
} as UserComment);

export const makeFakeCity = (): City => ({
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
} as City);

export const makeFakeOffer = (): Offers => ({
  id: 'ae9218e7-dfe9-4d3d-b807-a0fdff9d0a58',
  title: lorem.lines(1),
  type: 'room',
  price: 198,
  previewImage: system.filePath(),
  isFavorite: true,
  isPremium: false,
  rating: 2.2,
  city: makeFakeCity(),
  location: {
    'latitude': 48.868610000000004,
    'longitude': 2.342499,
    'zoom': 16
  }
} as Offers);

export const makeFakeOfferFull = (): Offer => ({
  id: 'ae9218e7-dfe9-4d3d-b807-a0fdff9d0a58',
  title: lorem.lines(1),
  type: 'room',
  price: 198,
  isFavorite: true,
  isPremium: false,
  rating: 2.2,
  city: makeFakeCity(),
  location: {
    'latitude': 48.868610000000004,
    'longitude': 2.342499,
    'zoom': 16
  },
  description: lorem.lines(3),
  images: makeFakeImagesData(),
  goods: ['Heating', 'Towels', 'Washing machine', 'Laptop friendly workspace'],
  host: makeFakeUserData(),
  bedrooms: 4,
  maxAdults: 5,
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  MAIN: {
    currentCity: Cities.PARIS,
    currentSort: Sort.Popular,
    userName: null,
  },
  DATA: {
    offers: [] as Offers[],
    isOffersLoading: false,
    offer: null,
    isOfferLoading: false,
    nearBy: [] as Offers[],
    isNearByLoading: false,
    isReviewLoading: false,
    reviews: [] as UserComment[],
    PostCommentLoading: false,
    favoriteOfferCards: [] as Offers[],
    favoriteOfferCardsLoading: false,
  },
  USER: {
    authorizationStatus: LoginStatus.Unknown,
  },
  ...initialState ?? {},
});
