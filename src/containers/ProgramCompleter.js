import React from 'react';

import Completer from '../components/Completer';

const toggleClass = isVisible => (isVisible) ? 'show' : 'hide';

class ProgramCompleterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(item) {
    this.props.onClick(item);
  }

  render() {
    const {items, isOpen} = this.props;
    return (
      <div className={`completer ${toggleClass(isOpen)}`}>
        <Completer items={items} onClick={this.onClickHandler}/>
      </div>
    )
  }
}

export default ProgramCompleterContainer;
