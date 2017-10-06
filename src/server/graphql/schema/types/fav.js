import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const favType = new GraphQLObjectType({
  name: 'Fav',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the fav'
    },
    userId: {
      type: GraphQLInt,
      description: 'ID of the User',
    },
    kommandrId: {
      type: GraphQLInt,
      description: 'ID of the Kommandr',
    },
    createdAt: {
      type: GraphQLString,
    }
  })
});

export default favType;
