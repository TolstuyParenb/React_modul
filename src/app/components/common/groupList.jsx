import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItems
}) => {
  return (
    <ul className='list-group'>
      {Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          className={
            'list-group-item' + (items[item] === selectedItems ? ' active' : '')
          }
          onClick={() => onItemSelect(items[item])}
          role='button'
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
};
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItems: PropTypes.object
};
export default GroupList;
