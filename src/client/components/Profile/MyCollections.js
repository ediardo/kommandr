import React from 'react';
import PropTypes from 'prop-types';
import _  from 'lodash';
import { Route, Switch } from 'react-router-dom';

import ModalCollection from '../Modal/ModalCollection';
import ModalViewCollection from '../Modal/ModalViewCollection';
import CollectionList from '../Collection/CollectionList';
import ListWithFilters from '../List/ListWithFilters';

const MyCollections = ({ filteredItems, query, filters, sort, isCurrentUser, ...rest }) => {

  return (
    <div>
      <Switch>
        <Route path="/u/:username/collections/add"render={(props) => <ModalCollection isOpen={true} mode="add" {...props} />} />
        <Route path="/u/:username/collections/view/:name" render={(props) => <ModalViewCollection isOpen={true} mode="view" {...props} />} />
      </Switch>
      <CollectionList data={filteredItems} isCurrentUser={isCurrentUser} />      
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
  listActions: [
    { 
      name: 'Add Collection',
      url: '/add',
      onlyCurrentUser: true,
      color: 'primary',
    },
  ],
  listName: 'collections',
});