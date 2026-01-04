import { Drawer, DrawerHeader, DrawerItems } from 'flowbite-react';
import React from 'react';
import UserForm from './UserForm';
import { HiEnvelope } from 'react-icons/hi2';

const CustomDrawer = ({ isOpen, handleClose, fetchUsers, title }) => {
  return (
    <Drawer
      className="w-1/3"
      open={Boolean(isOpen)}
      onClose={handleClose}
      position="right"
    >
      <DrawerHeader title={title ?? 'Edit User'} titleIcon={HiEnvelope} />
      <DrawerItems>
        {isOpen && (
          <UserForm
            handleClose={handleClose}
            fetchUsers={fetchUsers}
            userData={isOpen}
            source="admin"
          />
        )}
      </DrawerItems>
    </Drawer>
  );
};

export default CustomDrawer;
