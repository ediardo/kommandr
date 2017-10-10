import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import models from '../../../models';
import userType from './user';

const kommandrType = new GraphQLObjectType({
  name: 'Kommandr',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID of the Kommandr',
      resolve: (kommandr) => kommandr.id
    },
    userId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'ID of the author',
      resolve: (kommandr) => kommandr.userId,
    },
    collectionId: {
      type: GraphQLID,
      description: 'ID of the collection',
      resolve: (kommandr) => kommandr.collectionId,
    },
    title: {
      type: GraphQLString,
      description: 'Title of the kommandr',
      resolve: (kommandr) => kommandr.title,
    },
    cli: {
      type: GraphQLString,
      description: 'CLI content of the kommandr',
      resolve: (kommandr) => kommandr.cli,
    },
    description: {
      type: GraphQLString,
      description: 'Description of the kommandr',
      resolve: (kommandr) => kommandr.description,
    },
    forkFrom: {
      type: GraphQLInt,
      description: 'Kommandr ID',
      resolve: (kommandr) => kommandr.forkFrom,
    },
    createdAt: {
      type: GraphQLString,
      description: 'Timestamp',
      resolve: (kommandr) => kommandr.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      description: 'Timestamp',
      resolve: (kommandr) => kommandr.updatedAt,
    },
    totalViews: {
      type: GraphQLInt,
      description: 'Counter',
      resolve: (kommandr) => kommandr.totalViews
    },
    totalForks: {
      type: GraphQLInt,
      description: 'Counter',
      resolve: (kommandr) => kommandr.totalForks
    },
    totalFavs: {
      type: GraphQLInt,
      description: 'Counter',
    },
    author: {
      type: userType,
      resolve(kommandr) {
        return models.User.findById(kommandr.userId)
      }
    }
  })
});

export default kommandrType;
