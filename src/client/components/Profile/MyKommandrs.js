import React, { Component } from 'react';

import { graphql } from 'react-apollo';

import InputSearch from '../Form/InputSearch';
import MyKommandrList from './MyKommandrList';

class MyKommandrs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onChangeSearch(query) {
    this.setState({ query });
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="m-3">
          <InputSearch value={this.state.query} onChange={this.onChangeSearch} />
        </div>
        <MyKommandrList username={user.username} query={this.state.query} />
      </div>
    )
  }
}

export default MyKommandrs;