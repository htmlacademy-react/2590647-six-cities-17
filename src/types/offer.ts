export type Offer = {
  id: string;
  title: string;
  description: string;
  previewPictureURL: string;
  pictures: {
    id: number;
    url: string;
  }[];
  type: string;
  city: string;
  price: number;
  rating: number;
  bedroomCount: number;
  maxGuestCount: number;
  isPremium: boolean;
  isFavorite: boolean;
  host: {
    avatarURL: string;
    name: string;
    isPro: boolean;
  };
}
