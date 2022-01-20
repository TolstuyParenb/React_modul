import React from "react";

const SearchStatus = ({ length }) => {
  const renderPhrase = () => {
    return length === 4 || length === 3 || length === 2
      ? "человека"
      : "человек";
  };
  const formatCount = () => {
    if (length === 0) {
      return <h1 className="badge bg-danger fs-1">Никто с тобой не тусанет</h1>;
    }
  };
  return length !== 0 ? (
    <h1 className="badge bg-primary fs-1">
      {length} {renderPhrase()} тусанет с тобой сегодня
    </h1>
  ) : (
    <span className="badge fs-1">{formatCount()}</span>
  );
};

export default SearchStatus;
