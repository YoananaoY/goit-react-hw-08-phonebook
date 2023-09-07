import React from 'react';
import { useAuthUser } from 'hooks/useAuthUser';
import css from './Home.module.css';

export const Home = () => {
  const { isUser, isLogged } = useAuthUser();

  const { name } = isUser;

  return (
    <div className={css.homeContainer}>
      {isLogged ? (
        <div className={css.welcomeMessage}>
          <p>Witaj {name}</p>
        </div>
      ) : (
        <div className={css.loginMessage}>Please login or register</div>
      )}
    </div>
  );
};
