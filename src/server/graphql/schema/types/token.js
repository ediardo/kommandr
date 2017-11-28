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
      type: GraphQLInt,
      description: 'ID of the User',
    },
    tokenHash: {
      type: GraphQLString,
      description: 'Salted hash of the token',
      resolve: (token, args, ctx) => {
        console.log(token, args, ctx);
        return 'afdsafsdasfdsdaf'
      }
    },
    tokenHint: {
      type: GraphQLInt,
      description: 'Last four characters of the token',
    },
    createdAt: {
      type: GraphQLString,
    },
    updateAt: {
      type: GraphQLString,
    }
  })
});

export default tokenType;
