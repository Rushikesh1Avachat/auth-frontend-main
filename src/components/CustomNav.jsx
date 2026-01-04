import React from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { SiFusionauth } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io';
import { IoLogOutOutline } from 'react-icons/io5';
import { useAuth } from '../hooks/useAuth';
import axiosInstance from '../utils/AxiosInstance';
import { MdDashboard } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { GiAstronautHelmet } from 'react-icons/gi';
const CustomNav = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout');
      logout();
    } catch (error) {
      console.log(error, 'from error');
    }
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        {/* <img
         src="/favicon.svg"
         className="mr-3 h-6 sm:h-9"
         alt="Flowbite React Logo"
       /> */}
        <SiFusionauth className="text-2xl mr-2" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Auth
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isAuthenticated ? (
          <>
            <Dropdown arrowIcon={false} inline label={<GiAstronautHelmet />}>
              <Dropdown.Header>
                <span className="block text-sm">{user.username}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              {/* Component for nav by user role */}
              <DropdownBox user={user} navigate={navigate} />
              <Dropdown.Item
                className="font-semibold flex gap-3"
                onClick={handleLogout}
              >
                <IoLogOutOutline /> Logout
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </>
        ) : (
          <Button
            onClick={() => navigate('/login')}
            gradientDuoTone="tealToLime"
          >
            Login
            <IoMdLogIn className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </Navbar>
  );
};

export default CustomNav;

const DropdownBox = ({ user, navigate }) => {
  const adminNavItems = [
    {
      label: 'Dashboard',
      icon: <MdDashboard />,
      path: '/admin',
    },
    {
      label: 'Profile',
      icon: <ImProfile />,
      path: '/admin/profile',
    },
  ];
  const userNavItem = [
    {
      label: 'Profile',
      icon: <ImProfile />,
      path: '/user-profile',
    },
  ];
  const navItems = user?.role === 'admin' ? adminNavItems : userNavItem;
  return navItems.map((item, idx) => (
    <Dropdown.Item
      key={idx + 1}
      className="font-semibold flex gap-3"
      onClick={() => navigate(item?.path)}
    >
      {item?.icon} {item?.label}
    </Dropdown.Item>
  ));
};
