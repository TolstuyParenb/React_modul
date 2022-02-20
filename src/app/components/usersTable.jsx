import React from 'react';
import PropTypes from 'prop-types';
import BookMark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';
import { Link } from 'react-router-dom';

const UserTable = ({
  users,
  onSort,
  selectedSort,
  onBookMark,
  onDelete,
  currentPath,
  setCurrentPath,
  ...rest
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качество',
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: ' Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'boolmark',
      name: 'Избраное',
      component: (user) => (
        <BookMark status={user.bookmark} onClick={() => onBookMark(user._id)} />
      )
    },
    delete: {
      component: (user) => (
        <button
          className='btn btn-danger m-2'
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
      )
    }
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
      currentPath={currentPath}
      setCurrentPath={setCurrentPath}
    />
  );
};
UserTable.propTypes = {
  users: PropTypes.array,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  currentPath: PropTypes.string,
  setCurrentPath: PropTypes.func
};

export default UserTable;
