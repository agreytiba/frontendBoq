import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthorized = user && roles.includes(user.accessLevel);

  return isAuthorized ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" state={{ from: rest.location.pathname }} />
  );
};

export default PrivateRoute;



