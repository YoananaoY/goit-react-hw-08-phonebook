import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/actions';
import { useAuthUser } from 'hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';
import css from './NavigationBar.module.css';

export const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogged } = useAuthUser();

  const handleLogout = () => {
    navigate('/login');
    dispatch(logOut());
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink
          className={css.navLink}
          activeClassName="active"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={css.navLink}
          activeClassName={css.active}
          to="/contacts"
        >
          Contacts
        </NavLink>
        {isLogged ? (
          <button className={css.logoutButton} onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <>
            <NavLink
              className={css.navLink}
              activeClassName={css.active}
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className={css.navLink}
              activeClassName={css.active}
              to="/register"
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};
