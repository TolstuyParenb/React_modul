/* eslint-disable indent */
import React from 'react';
import { useParams } from 'react-router-dom';
import UsersList from '../components/usersList';
import UserPage from '../components/userPage';

const Users = () => {
  const { userId } = useParams();

  if (userId) return <UserPage id={userId} />;
  return <UsersList />;
};

export default Users;
