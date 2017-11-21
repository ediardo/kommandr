import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

import CustomTooltip from '../CustomTooltip';

const ActionButton = ({ name, text, onClick, disabled, tooltip }) => {
  var color, iconName, id, tooltipContent;
  switch (name) {
    case 'update':
      id = 'actionUpdate';
      color = 'success';
      iconName = 'floppy-o';
      tooltipContent = 'Update this Kommandr';
      break;
    case 'add':
      id = 'actionAdd';
      color = 'success';
      iconName = 'floppy-o';
      tooltipContent = 'Create new Kommandr';
      break;
    case 'report':
      id = 'actionReport';
      color = 'warning';
      iconName = 'flag';
      tooltipContent = 'Report this Kommandr';
      break;
    case 'delete':
      id = 'actionDelete';
      color = 'danger';
      iconName = 'trash';
      tooltipContent = 'Delete this Kommandr';
      break;
    case 'share':
      id = 'actionShare';
      color = 'info';
      iconName = 'share';
      tooltipContent = 'Share this Kommandr';
      break;
    default:
      return null;
  }
  return (
    <Button color={color} onClick={() => onClick()} size="sm" disabled={disabled} id={id}>
      <FontAwesome name={iconName} />{' '}{text}
      {tooltip && <CustomTooltip content={tooltipContent} target={id} />}
    </Button>
    
  )
};

ActionButton.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  tooltip: PropTypes.bool,
}

ActionButton.defaultProps = {
  disabled: undefined,
  tooltip: undefined,
};

export default ActionButton;