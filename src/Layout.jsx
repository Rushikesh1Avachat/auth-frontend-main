import { Outlet } from 'react-router';
import React from 'react';
import { CustomNav } from './components';

const Layout = () => {
  return (
    <div>
      <div className="container pt-10 mx-auto">
        <CustomNav />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
