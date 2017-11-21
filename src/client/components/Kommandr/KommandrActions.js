import React from 'react';
import { graphql } from 'react-apollo';
import { Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import ModalDelete from '../Modal/ModalDeleteKommandr';
import ModalShare from '../Modal/ModalShareKommandr';
import currentUser from '../../graphql/queries/currentUser.gql';

const KommandrActions = (props) => {

  const handleOnClickSave = () => {
    props.onSave();
  }

  const handleOnClickDelete = () => {
    props.onDelete();
  }

  const handleOnClickFork = () => {
    props.onFork();
  }

  const handleOnClickFlag = () => {
    props.onFlag();
  }

  const { mode, author, data: { currentUser } } = props;
  const ownKommandr = currentUser && currentUser.username === author.username;
  return (
    <div>
      {mode === 'create' &&
        <span>
          <Button color="success" size="sm" onClick={handleOnClickSave} >
            <FontAwesome name="floppy-o" />{' '}create
          </Button>
        </span> 
      }
      {ownKommandr && mode === 'view' &&
        <span className="ml-2">
          <Button color="primary" size="sm" onClick={handleOnClickSave} >
            <FontAwesome name="floppy-o" />{' '}update
          </Button>
        </span>
      }
      {!ownKommandr && mode === 'view' &&
        <span className="ml-2">
          <Button color="primary" size="sm" onClick={handleOnClickFork}>
            <FontAwesome name="code-fork" />{' '}fork
          </Button>
        </span>
      }
      {ownKommandr && mode === 'view' &&
        <span className="ml-2">
          <Button color="danger" size="sm" onClick={handleOnClickDelete}>
            <FontAwesome name="trash-o" />{' '}delete
          </Button>
        </span>
      }
      {!ownKommandr && mode === 'view' &&
        <span className="ml-2">
          <Button color="warning" size="sm" onClick={handleOnClickFlag}>
            <FontAwesome name="flag" />{' '}report
          </Button>
        </span>
      }
    </div>
  )
}

export default graphql(currentUser)(KommandrActions);