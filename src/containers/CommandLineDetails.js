import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Table } from 'reactstrap';

import programOptionsSelector from '../selectors/programOptions';

import Argument from '../components/Argument';
import Option from '../components/Option';
import OptionSeparator from '../components/OptionSeparator';

class CommandLineDetails extends Component {

  render() {
    const { options } = this.props;
    if (options.length === 0) return  null;
    return (
      <Container fluid size="sm">
        <Row>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Option</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(options).map((optionId, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td><Option option={options[idx].longOpt} />, <Option option={options[idx].shortOpt} /></td>
                      <td>{options[idx].argType}</td>
                      <td>{options[idx].description}</td>
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  options: programOptionsSelector(state)
});

export default connect(mapStateToProps)(CommandLineDetails);
