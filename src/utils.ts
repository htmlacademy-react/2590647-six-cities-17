import { Offer } from './types/offer';

export const groupOffersByCity = (offers: Offer[]) =>
  offers.reduce((acc, offer) => {
    acc[offer.city.name] = acc[offer.city.name] || [];
    acc[offer.city.name].push(offer);
    return acc;
  }, {} as Record<string, Offer[]>);

export function getUrlById (id: string) {
    return `/offer/${id}`;
  }