import { Offers, Point } from '../../types/offer';
import Card from '../../components/card/card';

type ListOffersProps = {
  offers: Offers[];
  onHandleMouseOffer: (offerId: Point | null) => void;
}

function ListOffers({ offers, onHandleMouseOffer }: ListOffersProps): JSX.Element {

  return (

    <div className="cities__places-list places__list tabs__content" data-testid='cards-list-container'>
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} onHandleMouseOffer={onHandleMouseOffer}/>
      ))}
    </div>

  );
}

export default ListOffers;
