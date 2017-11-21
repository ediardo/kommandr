import React from 'react';
import PropTypes from 'prop-types';
import _  from 'lodash';

import KommandrList from '../Kommandr/KommandrList';
import ListWithFilters from '../List/ListWithFilters';

const MyStars = ({ filteredItems, query, filters, sort, modalIsOpen, toggleModalHandler }) => {
  return <KommandrList data={filteredItems} />;
};

MyStars.propTypes = {
  data: PropTypes.array,
  query: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.object
};

export default ListWithFilters(MyStars, {
  filterFields: ['title',],
  orderFields: [
    { 'createdAt': 'desc' },
    { 'name': 'asc' },
  ],
  paginator: {
    pageSize: 15,
  },
  queryPlaceholder: 'Search your starred Kommandrs',
  listName: 'kommandrs',
});