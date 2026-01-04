import React from 'react';
import { CustomNav } from '../components';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
      <div className="container pt-10 px-10 mx-auto">
        <CustomNav />
      </div>
      <div className="container pt-10 px-10 mx-auto">{<Outlet />}</div>
    </>
  );
};

export default UserLayout;
