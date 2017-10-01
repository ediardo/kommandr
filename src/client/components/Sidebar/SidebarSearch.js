import React, { Component } from 'react';

import { Container, Col, Row, Input } from 'reactstrap';

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

  doSearch() {
    const { query } = this.state;
    this.props.searchKommandr({
      variables: { query: query }
    }).then(({data}) =>{
      console.log(data);
    }).catch(error => {
      console.log('there was an error ', error);
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
          <SidebarSearchResults query={query} />
        </Row>
      </div>
    )
  }
}


export default SidebarSearch;