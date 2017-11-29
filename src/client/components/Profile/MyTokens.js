import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';

import ModalToken from '../Modal/ModalToken';
import TokenList from '../Token/TokenList';
import ListWithFilters from '../List/ListWithFilters';

const MyTokens = ({ filteredItems, query, filters, sort, ...rest }) => {
  
  return (
    <div>
      <Route path="/settings/client/addToken" render={props => <ModalToken isOpen={true} mode="add" {...props} />} />
      
      <TokenList data={filteredItems} />      
    </div>
  )
};

MyTokens.propTypes = {
  data: PropTypes.array,
  query: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.object
}

export default ListWithFilters(MyTokens, {
  filterFields: ['name',],
  orderFields: [
    { 'createdAt': 'desc' },
    { 'name': 'asc' },
  ],
  paginator: {
    pageSize: 15,
  },
  queryPlaceholder: 'Search Tokens',
  listActions: [
    { 
      name: 'Add Token',
      url: '/addToken',
      color: 'primary',
    },
  ],
  listName: 'tokens',
});