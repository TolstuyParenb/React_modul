import React from 'react';
import PropTypes from 'prop-types';

const Qualitie = ({ _id, name, color }) => {
  return (
    <span key={_id} className={`badge bg-${color} m-1`}>
      {name + ' '}
    </span>
  );
};

Qualitie.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
export default Qualitie;
