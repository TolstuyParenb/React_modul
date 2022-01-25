import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
  const renderPhrase = () => {
    return length === 4 || length === 3 || length === 2
      ? 'человека'
      : 'человек';
  };
  const formatCount = () => {
    if (length === 0) {
      return <h1 className="badge bg-danger fs-1">Никто с тобой не тусанет</h1>;
    }
  };
  return length !== 0 ? (
    <span className="badge bg-primary fs-1">
      {length} {renderPhrase()} тусанет с тобой сегодня
    </span>
  ) : (
    <span className="badge fs-1">{formatCount()}</span>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};
export default SearchStatus;
