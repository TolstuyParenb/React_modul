import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from './qualitie';

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((qual) => (
        <Qualitie {...qual} key={qual._id} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};
export default QualitiesList;
