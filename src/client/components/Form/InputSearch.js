import React, { Component } from 'react';

import FontAwesome from 'react-fontawesome';
import { Input, Label } from 'reactstrap';

class InputSearch extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.value || ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
    this.setState({ query: e.target.value });
  }

  render() {
    const { id, classNames, placeholder, reset } = this.props;
    return (
      <div className="container-search-input">
        <Label for="searchInput">
          <FontAwesome name="search" />
        </Label>
        <Input type="text" className="search-input" id="searchInput" value={this.state.value} placeholder={placeholder || 'Search'} onChange={this.onChange} />
        {reset && <FontAwesome name="times" />}
      </div>
    )
  }  
}

export default InputSearch;
