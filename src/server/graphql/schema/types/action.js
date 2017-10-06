import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

const actionType = new GraphQLObjectType({
  name: 'Action',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the action',
    },
    userId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'ID of the User',
    },
    targetId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'ID of the target object',
    },
    targetType: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Type of the target',
    },
    createdAt: {
      type: GraphQLString,
    }
  })
});

export default actionType;
