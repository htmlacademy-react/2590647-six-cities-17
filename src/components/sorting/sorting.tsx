import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Sort } from '../../const';
import { changeSorting } from '../../store/actions';

function Sorting(): JSX.Element {
  const sortRef = useRef<HTMLElement>(null);
  const currentSort = useAppSelector((state) => state.currentSort);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hideSort = (evt: MouseEvent) => {
      if (evt.target instanceof HTMLElement && sortRef.current && !sortRef.current.contains(evt.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', hideSort);

    return () => {
      document.removeEventListener('click', hideSort);
    };
  }, []);

  return (

    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span
        ref={sortRef}
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setMenuOpen((lastOpened) => !lastOpened)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isMenuOpen ? 'places__options--opened' : ''}`}>
        {Object.values(Sort).map((sort) => (
          <li
            key={sort}
            className={`places__option ${sort === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => dispatch(changeSorting(sort))}
          >
            {sort}
          </li>
        ))}
      </ul>
    </form>

  );
}

export default Sorting;
