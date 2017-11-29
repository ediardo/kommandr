import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

import Token from './Token';

const TokenList = ({ data }) => {
  console.log(data);
  const tokenList = data.map((token, idx) => {
    return (
      <ListGroupItem key={idx} >
        <Token data={token} />
      </ListGroupItem>
    )
  });
  return (
    <ListGroup className="list-tokens">
      {tokenList}
    </ListGroup>
  )
}

TokenList.propTypes = {
  data: PropTypes.array,
};

export default TokenList;