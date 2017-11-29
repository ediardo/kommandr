import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const tokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the '
    },
    userId: {
      type: GraphQLID,
      description: 'ID of the User',
    },
    name: {
      type: GraphQLString,
    },
    tokenHash: {
      type: GraphQLString,
      description: 'Salted hash of the token',
    },
    tokenHint: {
      type: GraphQLString,
      description: 'Last four characters of the token',
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
    lastUsedAt: {
      type: GraphQLString,
    },
  })
});

export default tokenType;
