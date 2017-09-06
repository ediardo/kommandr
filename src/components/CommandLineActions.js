import React, { Component } from 'react';

import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import CustomTooltip from './CustomTooltip';
import ModalDelete from './ModalDelete';
import ModalShare from './ModalShare';

class CommandLineActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyButtonTxt: 'Copy to clipboard',
      isOpenDropdown: false,
      isOpenModalDelete: false,
      isOpenModalShare: false
    };
    this.handleClickCopy = this.handleClickCopy.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.toggleModalShare = this.toggleModalShare.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleClickCopy() {
    this.props.handleClickCopy();
    this.setState({
      copyButtonTxt: 'Copied!'
    });
    setTimeout(() => {
      this.setState({
        copyButtonTxt: 'Copy to clipboard'
      });
    }, 2000);
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
    const { copyButtonTxt, isOpenModalDelete, isOpenModalShare, isOpenDropdown } = this.state;
    return (
      <div className="d-flex justify-content-end">

        <ButtonDropdown isOpen={isOpenDropdown} toggle={this.toggleDropdown}>
          <CustomTooltip content="Copy Kommandr" placement="top center" target="copyToClipboard" />
          <Button size="sm" color="secondary" id="copyToClipboard" onClick={this.handleClickCopy} >
            <FontAwesome name="clipboard" />{` ${copyButtonTxt}`}
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
