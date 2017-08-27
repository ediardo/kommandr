import React, { Component } from 'react';

import { Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import CustomTooltip from './CustomTooltip';

class CommandLineActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyButtonTxt: 'Copy to clipboard'
    };
    this.handleClickCopy = this.handleClickCopy.bind(this);
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

  render() {
    const { copyButtonTxt } = this.state;
    return (
      <div className="d-flex justify-content-end">
        <Button className="mr-2" color="secondary" id="copyToClipboard" onClick={this.handleClickCopy} >
          <FontAwesome name="clipboard" />{` ${copyButtonTxt}`}
        </Button>
        <CustomTooltip content="Copy Kommandr" placement="bottom center" target="copyToClipboard" />
        <Button color="primary" id="shareKommandr">
          <FontAwesome name="share-alt" />{' '}Share
        </Button>
        <CustomTooltip content="Share/Embed" placement="bottom center" target="shareKommandr" />
      </div>
    )
  }
}

export default CommandLineActions;
