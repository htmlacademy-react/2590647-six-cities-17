import { Link } from 'react-router-dom';
import { Cities } from '../../const';
import { useAppDispatch } from '../../store/hooks';
import { changeCity } from '../../store/action';

type CitiesProbs = {
  currentCity: string;
}

function CitiesList({currentCity}: CitiesProbs): JSX.Element {
   const dispatch = useAppDispatch();

  return (

    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(Cities).map((city) => (
            <li key={city.name} className="locations__item">
              <Link 
                className={`locations__item-link tabs__item ${currentCity === city.name ? 'tabs__item--active' : ''}`} 
                to={''}
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(changeCity(city))
                }}  
              >
                <span>{city.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>

  );
}

export default CitiesList;
