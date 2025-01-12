import { Link } from 'react-router-dom';
import { memo } from 'react';
import { Cities } from '../../const';
import { useAppDispatch } from '../../store/hooks';
import { changeCity } from '../../store/slices/main-process/main-process';

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
                  dispatch(changeCity(city));
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

const CitiesListMemoized = memo(CitiesList, (prevProps, nextProps) => prevProps.currentCity === nextProps.currentCity);

export default CitiesListMemoized;
