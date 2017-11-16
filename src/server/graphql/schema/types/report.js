import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

const reportType = new GraphQLObjectType({
  name: 'Report',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the fav'
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the User',
    },
    kommandrId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the Kommandr',
    },
    reason: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    }
  })
});

export default reportType;
