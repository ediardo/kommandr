import React from 'react';

import { Popover, PopoverTitle, PopoverContent } from 'reactstrap';

import Share from './Share';

const SharePopover = (props) => {
  const { isOpen, target, toggle } = props;
  return (
    <Popover isOpen={isOpen} placement="bottom" target={target} toggle={toggle}>
      <PopoverTitle>Share this kommandr</PopoverTitle>
      <PopoverContent>
        <Share url="https://kommandr.com/12312312" embed="<script></script>" />
      </PopoverContent>
    </Popover>
  )
}

export default SharePopover;
