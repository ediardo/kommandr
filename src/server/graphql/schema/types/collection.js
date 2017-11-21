import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';

import db from '../../../models';
import kommandrType from './kommandr';
import userType from './user';

const collectionType = new GraphQLObjectType({
  name: 'Collection',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the collection'
    },
    userId: {
      type: GraphQLInt,
      description: 'Owner of the collection',
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    matchRegex: {
      type: GraphQLString,
    },
    isEnabled: {
      type: GraphQLBoolean,
    },
    matchAllTime: {
      type: GraphQLBoolean,
    },
    author: {
      type: userType,
      resolve: collection => collection.User,
    },
    allKommandrs: {
      type: new GraphQLList(kommandrType),
      resolve: (collection, args, ctx) => {
        return db.Collection.getKommandrs();
      }
    },
    totalKommandrs: {
      type: GraphQLInt,
      description: 'Total kommandrs in this collection',
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    }
  })
});

export default collectionType;
