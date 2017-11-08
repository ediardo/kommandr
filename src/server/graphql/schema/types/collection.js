import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

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
    matchPattern: {
      type: GraphQLString,
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
