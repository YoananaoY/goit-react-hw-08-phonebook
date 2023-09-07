import { Navigate } from 'react-router-dom';
import { useAuthUser } from 'hooks/useAuthUser';

export const RestrictRoute = ({ children, redirectTo = '/' }) => {
  const { isLogged } = useAuthUser();

  return isLogged ? <Navigate to={redirectTo} /> : children;
};
