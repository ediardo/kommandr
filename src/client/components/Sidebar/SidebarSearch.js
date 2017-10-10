import React, { Component } from 'react';

import { Col, Row, Input } from 'reactstrap';

import SidebarSearchResults from './SidebarSearchResults';

class SidebarSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onKeyUpHandler(e) {
    if (e.key === 'Enter') {
      this.input.blur();
    }
  }

  onChangeInput(e) {
    this.setState({
      query: e.target.value
    });
  }


  render() {
    const { query } = this.state;
    return (
      <div>
        <Row className="sidebar-search">
          <Col xs="12" className="pt-3 pb-3">
            <Input type="text" className="search-input" name="sidebarSearchInput" value={query} onChange={this.onChangeInput} placeholder="Search Kommandr" onKeyUp={this.onKeyUpHandler} ref={(input) => {this.input = input;}}  />
          </Col>
        </Row>
        <Row>
          <SidebarSearchResults {...this.props} query={query}/>
        </Row>
      </div>
    )
  }
}


export default SidebarSearch;