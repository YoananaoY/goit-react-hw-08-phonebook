import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from 'components/navigationbar/NavigationBar';

export const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};
