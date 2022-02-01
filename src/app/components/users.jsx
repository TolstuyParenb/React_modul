/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import UserTable from './usersTable';
import PropTypes from 'prop-types';
import api from '../api';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import _ from 'lodash';
const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
  const pageSize = 5;

  const [users, setUsers] = useState();
  const [currentPath, setCurrentPath] = useState('Имя');
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
          // eslint-disable-next-line indent
          (user) =>
            // eslint-disable-next-line indent
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;

    const count = filteredUsers.length;
    const sortedUser = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUser, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className='row'>
        {professions && (
          <div className='d-flex flex-column flex-shrink-0 p-3 col-2'>
            <GroupList
              selectedItems={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className='btn btn-secondary mt-2' onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className='d-flex flex-column col-10'>
          <SearchStatus length={count} />
          {count > 0 && (
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onBookMark={handleBookMark}
              currentPath={currentPath}
              setCurrentPath={setCurrentPath}
            />
          )}

          <div className='d-flex justify-content-center'>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return 'Loading ...';
};

Users.propTypes = {
  users: PropTypes.array
};
export default Users;
