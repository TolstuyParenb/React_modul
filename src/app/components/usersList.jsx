/* eslint-disable indent */
import React, { useState, useEffect } from 'react';

import { paginate } from '../utils/paginate';
import Pagination from '../components/pagination';
import UserTable from '../components/usersTable';
import PropTypes from 'prop-types';
import api from '../api';
import GroupList from '../components/groupList';
import SearchStatus from '../components/searchStatus';

import _ from 'lodash';

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [searchUser, setSearchUser] = useState('');
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
  const [users, setUsers] = useState();
  const [currentPath, setCurrentPath] = useState('Имя');
  const pageSize = 4;

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
  }, [selectedProf, searchUser]);

  const handleProfessionSelect = (item) => {
    if (searchUser !== '') setSearchUser('');
    setSelectedProf(item);
  };

  const handleSearchUser = ({ target }) => {
    setSelectedProf(undefined);
    setSearchUser(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = searchUser
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchUser.toLowerCase())
        )
      : selectedProf
      ? users.filter(
          (user) =>
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

          <input
            type='text'
            name='searchUser'
            placeholder='Search people by name...'
            onChange={handleSearchUser}
            value={searchUser}
          />

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

UsersList.propTypes = {
  allUsers: PropTypes.array
};
export default UsersList;
