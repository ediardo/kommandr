import React, { Component } from 'react';

import InputSearch from '../Form/InputSearch';
import SidebarSearchResults from './SidebarSearchResults';

class SidebarSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onKeyUpHandler(e) {
    if (e.key === 'Enter') {
      this.input.blur();
    }
  }

  onChange(query) {
    this.setState({ query });
  }

  render() {
    const { query } = this.state;
    return (
      <div className="command-line-sidebar">
        <div className="sidebar-search">
          <InputSearch value={query} onChange={this.onChange} />
        </div>
        <div className="sidebar-search-results">
          <SidebarSearchResults {...this.props} query={query}/>
        </div>
      </div>
    )
  }
}

export default SidebarSearch;