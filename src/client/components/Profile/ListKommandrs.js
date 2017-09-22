import React, { Component } from 'react';

import { graphql } from 'react-apollo';

import Kommandr from '../Kommandr';

import kommandrsByUser from '../../queries/kommandrsByUser';

class ListKommandrs extends Component {
  render() {
    const { allKommandrsByUser, loading } = this.props.data;
    if (loading) return <p>Loading...</p>;
    const listKommandrs = allKommandrsByUser.map(kommandr => {
      return <li key={kommandr.id} className="list-item"><Kommandr data={kommandr} /></li>
      }
    );
    return (
      <ul className="my-list list-kommandrs">
        {listKommandrs}
      </ul>
    )
  }

}
export default graphql(kommandrsByUser, {
  options: (props) => {
    return { variables: {
      username: props.user.username
    }}
  }
})(ListKommandrs);
