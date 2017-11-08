import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const activityType = new GraphQLObjectType({
  name: 'Activity',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the fav'
    },
    userId: {
      type: GraphQLInt,
      description: 'ID of the User',
    },
    targetId: {
      type: GraphQLInt,
      description: 'ID of the resource affected by this activity',
    },
    targetType: {
      type: GraphQLString,
      description: 'Type of the resource'
    },
    targetName: {
      type: GraphQLString,
      description: ''
    },
    isPublic: {
      type: GraphQLInt,
    },
    createdAt: {
      type: GraphQLString,
    }
  })
});

export default activityType;
