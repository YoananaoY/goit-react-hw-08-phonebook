import { useSelector } from 'react-redux';
import {
  selectLoggedIn,
  selectIsRefreshing,
  selectUser,
} from 'redux/selectors';

export const useAuthUser = () => {
  const isLogged = useSelector(selectLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isUser = useSelector(selectUser);

  return {
    isLogged,
    isRefreshing,
    isUser,
  };
};
