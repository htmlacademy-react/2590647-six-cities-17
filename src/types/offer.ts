export type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type Point = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Points = Point[];

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offers = {
  id: string;
  title: string;
  previewImage: string;
  type: string;
  city: City;
  location: Point;
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  images: string[];
  type: string;
  city: City;
  location: Point;
  price: number;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  isPremium: boolean;
  isFavorite: boolean;
  goods: string[];
  host: Host;
};

