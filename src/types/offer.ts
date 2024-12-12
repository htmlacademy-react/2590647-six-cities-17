export type City = {
  name: string;
  latitude: number,
  longitude: number,
  zoom: number
};

export type Point = {
  title: string;
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Points = Point[];

export type Host = {
  avatarURL: string;
  name: string;
  isPro: boolean;
};

export type Pictures = {
  id: number;
  url: string;
}[];

export type Offer = {
  id: string;
  title: string;
  description: string;
  previewPictureURL: string;
  pictures: Pictures;
  type: string;
  city: City;
  location: Point;
  price: number;
  rating: number;
  bedroomCount: number;
  maxGuestCount: number;
  isPremium: boolean;
  isFavorite: boolean;
  host: Host;
};
