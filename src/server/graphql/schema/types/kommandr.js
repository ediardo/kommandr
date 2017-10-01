import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { assign } from 'lodash';
import models from '../../../models';
import commentType from './comment';
import userType from './user';

const kommandrType = new GraphQLObjectType({
  name: 'Kommandr',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the Kommandr',
    },
    hashId: {
      type: GraphQLString,
      description: 'Hashed ID of the Kommandr',
    },
    userId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'ID of the author',
    },
    collectionId: {
      type: GraphQLID,
      description: 'ID of the collection',
    },
    title: {
      type: GraphQLString,
      description: 'Title of the kommandr',
    },
    cli: {
      type: GraphQLString,
      description: 'CLI content of the kommandr',
    },
    description: {
      type: GraphQLString,
      description: 'Description of the kommandr',
    },
    forkFrom: {
      type: GraphQLInt,
      description: 'Kommandr ID',
    },
    createdAt: {
      type: GraphQLString,
      description: 'Timestamp',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'Timestamp',
    },
    totalViews: {
      type: GraphQLInt,
      description: 'Counter',
    },
    totalForks: {
      type: GraphQLInt,
      description: 'Counter',
    },
    totalComments: {
      type: GraphQLInt,
      description: 'Counter',
    },
    totalFavs: {
      type: GraphQLInt,
      description: 'Counter',
    },
    comments: {
      type: new GraphQLList(commentType),
      resolve(kommandr) {
        return kommandr.getComments();
      }
    }
  }
});

export default kommandrType;
