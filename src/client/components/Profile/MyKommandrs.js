import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputSearch from '../Form/InputSearch';
import KommandrList from '../Kommandr/KommandrList';

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
    const { data: kommandrs } = this.props;
    console.log(kommandrs);
    return (
      <div>
        <div className="m-3">
          <InputSearch value={this.state.query} onChange={this.onChangeSearch} />
        </div>
        <KommandrList data={kommandrs} />        
      </div>
    )
  }
}
MyKommandrs.propTypes = {
  data: PropTypes.array,
}

export default MyKommandrs;