import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const starType = new GraphQLObjectType({
  name: 'Star',
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

export default starType;
