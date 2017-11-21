import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

import { siteUrl } from '../../utils';

const ModalShareKommandr = ({ isOpen, toggle, kommandr }) => {
  if (!kommandr) return null;
  return (
    <Modal isOpen={isOpen} toggle={() => toggle()}>
      <ModalHeader toggle={() => toggle() }>
        <FontAwesome name="share" />{' '}Share kommandr
        </ModalHeader>
      <ModalBody>
        <p>Share this Kommandr with the Internet</p>
        <FormGroup>
          <Label for="urlInput">URL</Label>
          <Input type="text" disabled defaultValue={siteUrl(`/k/${kommandr.id}`)} />

          <Label for="cliInput">Kommandr CLI</Label>
          <Input type="text" id="cliInput" disabled defaultValue={`kommandr get ${kommandr.id}`} />

          <Label for="embedInput">Embed on Website</Label>
          <Input type="text" id="embedInput" disabled defaultValue="soon..." />

        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button outline color="secondary" onClick={() =>toggle() }>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

ModalShareKommandr.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  kommandr: PropTypes.object
};

export default ModalShareKommandr;
