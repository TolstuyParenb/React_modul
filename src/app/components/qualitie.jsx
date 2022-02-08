import React from 'react';
import PropTypes from 'prop-types';

const Qualitie = ({ _id, name, color }) => {
  return (
    <h5 key={_id} className={`badge bg-${color} m-1`}>
      {name + ' '}
    </h5>
  );
};

Qualitie.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string
};
export default Qualitie;
