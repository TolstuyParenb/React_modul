import React from 'react';
import PropTypes from 'prop-types';

const BookMark = ({ status, ...rest }) => {
  const { onClick } = rest;

  const bookmark = (status) => {
    if (status === true) {
      return <i className="bi bi-bookmark-fill"></i>;
    } else {
      return <i className="bi bi-bookmark"></i>;
    }
  };

  return (
    <button className="btn btn-light" onClick={onClick}>
      {bookmark(status)}
    </button>
  );
};
BookMark.propTypes = {
  status: PropTypes.bool.isRequired
};
export default BookMark;
