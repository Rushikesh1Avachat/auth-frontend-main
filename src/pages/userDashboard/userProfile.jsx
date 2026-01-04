import React from 'react';
import { UserCard, UserForm } from '../../components';

const UserProfile = () => {
  return (
    <div className="flex max-w-full flex-row gap-4">
      <UserCard />
      <UserForm />
    </div>
  );
};

export default UserProfile;
