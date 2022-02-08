import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';
import PropTypes from 'prop-types';

const Table = ({
  onSort,
  selectedSort,
  columns,
  data,
  children,
  currentPath,
  setCurrentPath
}) => {
  return (
    <table className='table'>
      {children || (
        <>
          <TableHeader
            {...{ onSort, selectedSort, columns, currentPath, setCurrentPath }}
          />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};
Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array,
  currentPath: PropTypes.string,
  setCurrentPath: PropTypes.func
};
export default Table;
