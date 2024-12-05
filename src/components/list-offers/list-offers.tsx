import { Offer } from '../../types/offer';
import { useState } from 'react';
import Card from '../../components/card/card';

type ListOffersProps = {
  offers: Offer[];
}


function ListOffers({ offers }: ListOffersProps): JSX.Element {

  const [activeOfferId, setActiveOfferId] = useState<string>('0');

  const handleMouseOver = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  return (

    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} onMouseOverCard={handleMouseOver} activeOfferId={activeOfferId}/>
      ))}
    </div>

  );
}

export default ListOffers;
