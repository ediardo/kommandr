import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import models from '../../../models';
import starType from './star';
import userType from './user';
import commentType from './comment';

const kommandrType = new GraphQLObjectType({
  name: 'Kommandr',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID of the Kommandr',
      resolve: kommandr => kommandr.hashId
    },
    userId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'ID of the author',
    },
    collectionId: {
      type: GraphQLID,
      description: 'ID of the collection'
    },
    title: {
      type: GraphQLString,
      description: 'Title of the kommandr',
    },
    cli: {
      type: GraphQLString,
      description: 'CLI content of the kommandr',
    },
    description: {
      type: GraphQLString,
      description: 'Description of the kommandr',
    },
    forkFrom: {
      type: GraphQLString,
      description: 'Kommandr ID',
    },
    createdAt: {
      type: GraphQLString,
      description: 'Timestamp',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'Timestamp',
    },
    totalViews: {
      type: GraphQLInt,
      description: 'Counter',
    },
    totalForks: {
      type: GraphQLInt,
      description: 'Counter',
    },
    totalStars: {
      type: GraphQLInt,
      description: 'Counter',
    },
    totalComments: {
      type: GraphQLInt,
      description: 'Counter',
    },
    author: {
      type: userType,
      resolve: kommandr => kommandr.User
    },
    allComments: {
      type: new GraphQLList(commentType),
      resolve: kommandr => models.Comment.findAll({
        include: [{
          model: models.Kommandr,
          where: { id: kommandr.id }
        }],
        order: [
          [ 'createdAt', 'DESC' ]
        ],
      })
    },
    allForks: {
      type: new GraphQLList(kommandrType),
      resolve: kommandr => models.Kommandr.findAll({
        attributes: ['userId', 'title', 'cli', 'createdAt', 'updatedAt', 'description', ['hashId', 'id']],
        include: [{
          model: models.Kommandr,
          as: 'Forks',
          where: { hashId: kommandr.id }
        }],
      })
    },
    allStars: {
      type: new GraphQLList(starType),
      resolve: kommandr => {
        return models.Star.findAll({
          include: [{
            model: models.Kommandr,
            where: { hashId: kommandr.id }
          }],
        });
      }
    }
  })
});

export default kommandrType;
