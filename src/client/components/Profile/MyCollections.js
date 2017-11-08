import React from 'react';
import PropTypes from 'prop-types';
import _  from 'lodash';

import ModalAddCollection from '../Modal/ModalAddCollection';
import CollectionList from '../Collection/CollectionList';
import ListWithFilters from '../List/ListWithFilters';

const MyCollections = ({ filteredItems, query, filters, sort, modalIsOpen, toggleModalHandler }) => {
  return (
    <div>
      <ModalAddCollection isOpen={modalIsOpen} toggle={toggleModalHandler} />
      <CollectionList data={filteredItems} /> 
    </div>
  )
};

MyCollections.propTypes = {
  data: PropTypes.array,
  query: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.object
}

export default ListWithFilters(MyCollections, {
  filterFields: ['name',],
  orderFields: [
    { 'createdAt': 'desc' },
    { 'name': 'asc' },
  ],
  paginator: {
    pageSize: 15,
  },
  queryPlaceholder: 'Search Collections',
  addNew: {
    modal: true,
    label: 'Add Collection',
  },
  listName: 'collections',
});