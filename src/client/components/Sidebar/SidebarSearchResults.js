import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { Col, Input } from 'reactstrap';

import KommandrList from '../Kommandr/KommandrList';

import searchKommandr from '../../queries/searchKommandr';

class SidebarSearchResults extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { loading, kommandrs } = this.props.data;
    if (loading) return <span>Loading...</span>;
    console.log(this.props.data);
    return (
      <div className="sidebar-search-results">
        <ul className="results-group">
          <KommandrList data={this.props.data.kommandrs} compact={true} />
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