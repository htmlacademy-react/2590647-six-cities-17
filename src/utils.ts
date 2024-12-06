import { Offer } from './types/offer';

export const groupOffersByCity = (offers: Offer[]) =>
  offers.reduce((acc, offer) => {
    acc[offer.city] = acc[offer.city] || [];
    acc[offer.city].push(offer);
    return acc;
  }, {} as Record<string, Offer[]>);