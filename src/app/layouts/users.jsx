import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage/userPage';
import UsersListPage from '../components/page/usersListPage';

const Users = () => {
  const { userId } = useParams();

  if (userId) return <UserPage id={userId} />;
  return <UsersListPage />;
};

export default Users;
