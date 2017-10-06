import {
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { assign } from 'lodash';
import { resolver } from 'graphql-sequelize';

import models from '../../../models';
import commentType from './comment';
import kommandrType from './kommandr';
import collectionType from './collection';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: user => user.id
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name
    },
    username: {
      type: GraphQLString,
      resolve: user => user.username
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email
    },
    isPasswordSet: {
      type: GraphQLBoolean,
      resolve: user => user.isPasswordSet
    },
    website: {
      type: GraphQLString,
      resolve: user => user.website
    },
    externalAvatarUrl: {
      type: GraphQLString,
      resolve: user => user.externalAvatarUrl
    },
    hasSeenWelcome: {
      type: GraphQLBoolean,
      resolve: user => user.hasSeenWelcome
    },
    createdAt: {
      type: GraphQLString,
      resolve: user => user.createdAt
    },
    status: {
      type: GraphQLInt,
      resolve: user => user.status
    },
  })
});

export default userType;
