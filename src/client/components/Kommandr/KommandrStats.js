import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import favKommandr from '../../queries/favKommandr';
import unfavKommandr from '../../queries/unfavKommandr';
import forkKommandr from '../../queries/forkKommandr';

const KommandrStats = (props) => {
  const { kommandrId, data: { views, forks, favs } } = props;
  
  const handleFavKommandr = () => {
    props.favKommandr({
      variables: { kommandrId }
    }).then(({ data }) => {
      console.log(data);
    });
  };

  const handleForkKommandr = () => {
    
  };

  return (
    <ul className="kommandr-stats views">
      <li className="metric-container views">
        <FontAwesome name="eye" className="mr-2" />
        <span className="metric">{views}</span>
      </li>
      <li className="metric-container forks">
        <Button color="link" onClick={handleFavKommandr}>
          <FontAwesome name="code-fork" className="mr-2" />
          <span className="metric">{forks}</span>
        </Button>
      </li>
      <li className="metric-container favs">
        <Button color="link" onClick={handleForkKommandr}>
          <FontAwesome name="heart" className="mr-2" />
          <span className="metric">{favs}</span>
        </Button>
      </li>
    </ul>
  )
};

export default compose(
  graphql(favKommandr, { name: 'favKommandr' }),
  graphql(unfavKommandr, { name: 'unfavKommandr' }),
  graphql(forkKommandr, { name: 'forkKommandr' }),
)(KommandrStats);

//export default KommandrStats;