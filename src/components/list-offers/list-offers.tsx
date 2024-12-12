import { Offer } from '../../types/offer';
import Card from '../../components/card/card';

type ListOffersProps = {
  offers: Offer[];
  onHandleMouseOffer: (offerId: string) => void;
}


function ListOffers({ offers, onHandleMouseOffer }: ListOffersProps): JSX.Element {

  return (

    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} onHandleMouseOffer={onHandleMouseOffer}/>
      ))}
    </div>

  );
}

export default ListOffers;
