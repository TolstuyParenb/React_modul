import React from "react";

const BookMark = ({ status, ...rest }) => {
  const { onClick } = rest;
  console.log(rest);
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

export default BookMark;
