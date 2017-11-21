import React from 'react';
import PropTypes from 'prop-types';
import _  from 'lodash';

import KommandrList from '../Kommandr/KommandrList';
import ListWithFilters from '../List/ListWithFilters';

const MyKommandrs = ({ filteredItems, query, filters, sort }) => {
  return (
    <KommandrList data={filteredItems} /> 
  )
};

MyKommandrs.propTypes = {
  data: PropTypes.array,
  query: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.object,
  isCurrentUser: PropTypes.bool,
};

export default ListWithFilters(MyKommandrs, {
  filterFields: ['title', 'cli', 'description'],
  orderFields: [
    { 'createdAt': 'desc' },
    { 'title': 'asc' },
  ],
  paginator: {
    pageSize: 15,
  },
  queryPlaceholder: 'Search Kommandrs',
  listName: 'kommandrs',
});