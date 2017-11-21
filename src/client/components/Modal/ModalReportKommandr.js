import React, { Component } from 'react';
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome';
import { Button, Modal, Label, Input, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const validReasons = {
  'spam': 'This is spam',
  'fake': 'This is fake or misleading title/command/description',
  'dangerous': 'This could be dangerous. Don\'t run unless you are sure',
};

const ReasonOptions = ({ reasons }) => {
  return Object.keys(reasons).map((reason, idx) => {
    return <option key={idx} value={reason}>{reasons[reason]}</option>;
  });
};

ReasonOptions.propTypes = {
  reasons: PropTypes.object,
}

class ModalReportKommandr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: 'spam',
    };
    this.onChangeReason = this.onChangeReason.bind(this);
  }

  onChangeReason(e) {
    const reason = e.target.value.toLowerCase();
    this.setState({
      reason
    });
  }

  render() {
    const { reason } = this.state;
    const { isOpen, onClickConfirm, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>
          <FontAwesome name="flag" />{' '}Report Kommandr
        </ModalHeader>
        <ModalBody>
          <p>Report this Kommandr if you think it goes againts our terms of service.</p>
          <Label for="reasonInput">Select a reason</Label>
          <Input type="select" name="reasonInput" id="reasonInput" value={reason} onChange={this.onChangeReason}>
            <ReasonOptions reasons={validReasons} />
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button outline color="secondary" onClick={() => toggle() }>Cancel</Button>
          <Button color="danger" onClick={() => onClickConfirm(reason)}>Report</Button>
        </ModalFooter>
      </Modal>
    )
  }
};

ModalReportKommandr.propTypes = {
  isOpen: PropTypes.bool,
  onClickOK: PropTypes.func,
  toggle: PropTypes.func,
};

export default ModalReportKommandr;
