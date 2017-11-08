import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

const ActionButton = ({ name, text, onClick, disabled }) => {
  var color, iconName;
  switch (name) {
    case 'fork':
      color = 'primary';
      iconName = 'code-fork';
      break;
    case 'update':
      color = 'success';
      iconName = 'floppy-o';
      break;
    case 'add':
      color = 'success';
      iconName = 'floppy-o';
      break;
    case 'report':
      color = 'warning';
      iconName = 'flag';
      break;
    case 'delete':
      color = 'danger';
      iconName = 'trash';
      break;
    default:
      return null;
  }
  return (
    <Button color={color} onClick={() => onClick()} size="sm" disabled={disabled}>
      <FontAwesome name={iconName} />{' '}{text}
    </Button>
  );
};

ActionButton.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

ActionButton.defaultProps = {
  disabled: undefined,
};

export default ActionButton;