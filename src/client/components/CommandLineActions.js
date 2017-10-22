import React, { Component } from 'react';

import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import CustomTooltip from './CustomTooltip';
import ModalDelete from './ModalDelete';
import ModalShare from './ModalShare';

class CommandLineActions extends Component {
  constructor(props) {
    super(props);
    const { mode } = this.props;
    this.state = {
      saveButtonTxt: (mode === 'create') ? 'Create Kommandr' : 'Update Kommandr',
      isOpenDropdown: false,
      isOpenModalDelete: false,
      isOpenModalShare: false
    };
    this.handleClickSave = this.handleClickSave.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.toggleModalShare = this.toggleModalShare.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleClickSave() {
    this.props.handleOnClickSave();
    const { mode } = this.props;
    if (mode !== 'create') {
      this.setState({
        saveButtonTxt: 'Saved!!'
      });
      setTimeout(() => {
        this.setState({
          saveButtonTxt: 'Save Kommandr'
        });
      }, 2000);
    }
    
  }

  toggleDropdown() {
    this.setState({
      isOpenDropdown: !this.state.isOpenDropdown
    });
  }

  toggleModalDelete() {
    this.setState({
      isOpenModalDelete: !this.state.isOpenModalDelete
    });
  }

  toggleModalShare() {
    this.setState({
      isOpenModalShare: !this.state.isOpenModalShare
    });
  }

  render() {
    const { saveButtonTxt, isOpenModalDelete, isOpenModalShare, isOpenDropdown } = this.state;
    return (
      <div className="d-flex justify-content-end">

        <ButtonDropdown isOpen={isOpenDropdown} toggle={this.toggleDropdown}>
          <CustomTooltip content="Copy Kommandr" placement="top center" target="saveKommandr" />
          <Button size="sm" color="primary" id="saveKommandr" onClick={this.handleClickSave} >
            <FontAwesome name="save" />{` ${saveButtonTxt}`}
          </Button>
          <DropdownToggle size="sm" caret color="secondary" />
          <DropdownMenu right>
            <DropdownItem onClick={this.toggleModalDelete}><FontAwesome name="trash-o" />{' '}Delete</DropdownItem>
            <DropdownItem onClick={this.toggleModalShare}><FontAwesome name="share-alt" />{' '}Share</DropdownItem>
            <DropdownItem><FontAwesome name="download" />{' '}Download</DropdownItem>
            <DropdownItem color="danger"><FontAwesome name="flag" />{' '}Report abuse</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <ModalDelete isOpen={isOpenModalDelete} toggle={this.toggleModalDelete} />
        <ModalShare isOpen={isOpenModalShare} toggle={this.toggleModalShare} />
      </div>
    )
  }
}

export default CommandLineActions;
