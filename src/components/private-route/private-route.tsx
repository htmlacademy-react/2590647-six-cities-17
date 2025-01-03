import { Navigate } from 'react-router-dom';
import { Path, LoginStatus } from '../../const';
import { useAppSelector } from '../../store/hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};
function PrivateRoute ({ children }: PrivateRouteProps): JSX.Element {
  const isLoggedIn = useAppSelector((state) => state.authorizationStatus) === LoginStatus.Auth;

  return isLoggedIn ? children : <Navigate to={Path.Login} />;
}

export default PrivateRoute;
