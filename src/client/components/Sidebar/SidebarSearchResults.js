import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import KommandrList from '../Kommandr/KommandrList';

import searchKommandr from '../../queries/searchKommandr';

class SidebarSearchResults extends Component {

  render() {
    const { loading, kommandrs } = this.props.data;
    if (loading) return <span>Loading...</span>;
    return (
      <div className="sidebar-search-results">
        <ul className="results-group">
          <KommandrList data={kommandrs} compact={true} />
        </ul>
      </div>
    )
  }
}

export default graphql(searchKommandr, {
  options: (props) => {
    return { variables: {
      query: props.query
    }}
  }
})(SidebarSearchResults);