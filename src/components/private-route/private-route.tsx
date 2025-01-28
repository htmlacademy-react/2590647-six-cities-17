import { Navigate } from 'react-router-dom';
import { Path } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: boolean;
  children: JSX.Element;
};
function PrivateRoute (props : PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === true
      ? children
      : <Navigate to={Path.Login} />
  );
}

export default PrivateRoute;
