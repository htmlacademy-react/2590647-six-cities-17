import { Navigate } from 'react-router-dom';
import { Path, LoginStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
  loginStatus: LoginStatus;
};

function PrivateRoute ({children, loginStatus}: PrivateRouteProps): JSX.Element {
  return loginStatus === LoginStatus.Auth ? children : <Navigate to={Path.Login} />;
}

export default PrivateRoute;
