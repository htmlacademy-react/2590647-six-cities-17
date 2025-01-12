import { Navigate } from 'react-router-dom';
import { Path } from '../../const';
import { useAppSelector } from '../../store/hooks';
import { selectIsAuthorized } from '../../store/slices/authorization/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};
function PrivateRoute ({ children }: PrivateRouteProps): JSX.Element {
  const isLoggedIn = useAppSelector(selectIsAuthorized);

  return isLoggedIn ? children : <Navigate to={Path.Login} />;
}

export default PrivateRoute;
