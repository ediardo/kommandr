import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import KommandrList from '../Kommandr/KommandrList';

import searchKommandr from '../../graphql/queries/searchKommandr.gql';

class SidebarSearchResults extends Component {

  render() {
    const { loading, allKommandrs } = this.props.data;
    if (loading) return <span>Loading...</span>;
    return (
      <div className="sidebar-search-results">
        <ul className="results-group">
          <KommandrList data={allKommandrs} compact={true} />
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