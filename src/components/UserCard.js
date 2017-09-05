import React from 'react';

import { Media } from 'reactstrap';

const UserCard = (props) => {
    const { userId, username, orientation } = props;

    if (orientation === 'horizontal') {
      return (
        <Media>
          <Media left href="#">
            <Media object data-src="holder.js/48x48" alt="Generic placeholder image" />
          </Media>
          <Media body>
            {username}
          </Media>
        </Media>
      )
    } else {
      return null;
    }
}

export default UserCard;
