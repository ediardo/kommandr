import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import saveAction from '../../queries/saveAction';


const KommandrStats = (props) => {
  const { data: { views, forks, favs }, saveAction } = props;
  
  const handleOnClick = (action) => {
    saveAction(action);
  }

  return (
    <ul className="kommandr-stats views">
      <li className="metric-container views">
        <FontAwesome name="eye" className="mr-2" />
        <span className="metric">{views}</span>
      </li>
      <li className="metric-container forks">
        <Button color="link" onClick={handleOnClick('fork')}>
          <FontAwesome name="code-fork" className="mr-2" />
          <span className="metric">{forks}</span>
        </Button>
      </li>
      <li className="metric-container favs">
        <Button color="link" onClick={handleOnClick('fav')}>
          <FontAwesome name="heart" className="mr-2" />
          <span className="metric">{favs}</span>
        </Button>
      </li>
    </ul>
  )
};

export default compose(
  graphql(saveAction, { name: 'saveAction' })
)(KommandrStats);