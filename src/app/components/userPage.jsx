import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import API from '../api';
import QualitiesList from './qualitiesList';

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    API.users.getById(id).then((data) => setUser(data));
  }, []);

  if (!user) return <h4>Loading...</h4>;
  return (
    <>
      <h1>{user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      <QualitiesList qualities={user.qualities} />
      <h5> Встретился раз: {user.completedMeetings}</h5>
      <h3>Рейтинг: {user.rate}</h3>
      <Link to='/users' className='btn btn-primary'>
        Все пользователи
      </Link>
    </>
  );
};
UserPage.propTypes = {
  id: PropTypes.string
};
export default UserPage;
