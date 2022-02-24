import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({
  onSort,
  selectedSort,
  columns,
  currentPath,
  setCurrentPath
}) => {
  const handleSort = (item, name) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setCurrentPath(name);
      onSort({ path: item, order: 'asc' });
    }
  };
  const sortArrow = (selectedSort, currentPath) => {
    if (selectedSort.order === 'desc') {
      return <i className='bi bi-caret-up-fill'></i>;
    } else {
      return <i className='bi bi-caret-down-fill'></i>;
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path, columns[column].name)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope='col'
          >
            {columns[column].name}
            {currentPath === columns[column].name && sortArrow(selectedSort)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object,
  columns: PropTypes.object.isRequired,
  currentPath: PropTypes.string,
  setCurrentPath: PropTypes.func
};
export default TableHeader;
