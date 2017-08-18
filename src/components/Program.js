import React from 'react';

class Program extends React.Component {
  render() {
    return (
      <div className="selected-program pull-left">
        {this.props.program.name}
      </div>
    )
  }
}

export default Program;
