import React, { Component } from 'react';

import { Col, Row } from 'reactstrap';

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
    this.setState({
      query
    });
  }

  render() {
    const { query } = this.state;
    return (
      <div>
        <Row className="sidebar-search">
          <Col xs="12" className="pt-3 pb-3">
            <InputSearch value={query} onChange={this.onChange} />
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