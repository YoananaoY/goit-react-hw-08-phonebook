import { Navigate } from 'react-router-dom';
import { useAuthUser } from 'hooks/useAuthUser';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLogged, isRefreshing } = useAuthUser();

  const redirectToRather = !isLogged && !isRefreshing;

  return redirectToRather ? <Navigate to={redirectTo} /> : <Component />;
};
