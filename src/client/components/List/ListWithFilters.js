import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputSearch from '../Form/InputSearch';
import { Alert, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

import Paginator from '../Paginator';

const ListAlert = ({ color, heading, text }) => {
  return (
    <Alert color={color}>
      {heading && <h4 className="alert-heading">{heading}</h4>}
      <p>{text}</p>
    </Alert>
  )
};

ListAlert.propTypes = {
  color: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.string,
};

function ListWithFilters(WrappedList, injectedProps) {
  return class extends Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        query: '',
        pageSize: 15,
        currentPage: 1,
        items: this.props.items,
        total: this.props.items.length,
        filterBy: injectedProps.filterFields[0],
        sortBy: injectedProps.orderFields[0],
        modalIsOpen: false,
      };
      this.onChangeSearch = this.onChangeSearch.bind(this);
      this.onPageChange = this.onPageChange.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
    }

    onChangeSearch(query) {
      const { filterBy } = this.state;
      let items = _.filter(this.props.items, (item) => {
        let filterField = item[filterBy].toLowerCase();
        if (filterField.startsWith(query.toLowerCase())) return item;
      });
      this.setState({ query, items, currentPage: 1, total: items.length });
    }
  
    onChangeFilterBy(filterBy) {
      //
    }
    
    onChangeSortBy(sortBy) {
      //
    }

    toggleModal() {
      this.setState({ modalIsOpen: !this.state.modalIsOpen });
    }

    onPageChange(currentPage) { 
      this.setState({ currentPage });

    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.items !== this.props.items) {
        this.setState({ items: nextProps.items });
      }
    }

    render() {
      const { filters, items, query, sort, currentPage } = this.state;
      const { queryPlaceholder, paginator: { pageSize }, listName, listActions = [] } = injectedProps;
      const { isCurrentUser, location } = this.props;
      const paginatedItems = _.slice(items, currentPage*pageSize - pageSize, currentPage*pageSize - 1);
      const listActionsBtns = listActions.map((action, idx) => {
        if (!action.onlyCurrentUser) {
          return <Button key={idx} tag={Link} to={location.pathname + action.url} color={action.color} className="list-action-create">{action.name}</Button>;
        } else if (isCurrentUser) {
          return <Button key={idx} tag={Link} to={location.pathname + action.url} color={action.color} className="list-action-create">{action.name}</Button>;
        }
      });
      return (
        <div className="container-list">
          <div className="container-list-actions border-bottom-1 d-flex flex-row">
            <InputSearch value={query} onChange={this.onChangeSearch} placeholder={queryPlaceholder} />
            {listActionsBtns}
          </div>
          {query.length > 0 && items.length === 0
            ? <ListAlert color="danger" heading={`Oops! No ${listName} matched your query`} text="Try using a different query" />
            : <WrappedList filteredItems={paginatedItems} filters={filters} sort={sort} query={query} {...this.props} />
          }
          <Paginator total={items.length} pageSize={pageSize} onPageChange={this.onPageChange} currentPage={currentPage} />
        </div>
      )
    }
  }
};

export default ListWithFilters;