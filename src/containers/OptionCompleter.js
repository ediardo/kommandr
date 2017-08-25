import React from 'react';
import { connect } from 'react-redux';

import Completer from '../components/Completer';
import availableOptionsSelector from '../selectors/availableOptions';

const toggleClass = isVisible => (isVisible) ? 'show' : 'hide';

class OptionCompleterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  
  onClickHandler(item) {
    this.props.onClick(item);
  }

  render() {
    const {options, isOpen} = this.props;
    return (
      <div className={`completer ${toggleClass(isOpen)}`}>
        <Completer items={options} onClick={this.onClickHandler}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  options: availableOptionsSelector(state),
  commandLine: state.commandLine
});

export default connect(mapStateToProps)(OptionCompleterContainer);
