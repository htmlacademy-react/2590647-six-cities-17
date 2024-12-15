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

export function getFormattedDate(date: string): string {
  const formatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedDate = formatter.format(new Date(date));

  return formattedDate;
}

export function formatDateToDateTime(date: string): string {
  return new Date(date).toISOString().split('T')[0];
}

export function getSortedItemsByDate<T extends { date: string }>(
  items: T[],
  limit: number
): T[] {
  return items
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
