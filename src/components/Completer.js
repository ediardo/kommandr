import React from 'react';

class Completer extends React.Component {

  onClickHandler(item, e) {
    this.props.onClick(item);
  }

  render() {
    const {items} = this.props;
    const listItems = Object.keys(items).map(id => {
      return (
        <li key={id} className="completer-item" onClick={this.onClickHandler.bind(this, items[id])} >
          <div className="completer-name">{items[id].name}</div>
          <small>{items[id].description}</small>
        </li>
      )
    });
    return (
        <ul className="completer-items">
          {listItems}
        </ul>

    )
  }
}

export default Completer;
