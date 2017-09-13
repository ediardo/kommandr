import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { resolver } from 'graphql-sequelize';

import userType from './types/user';
import commentType from './types/comment';
import kommandrType from './types/kommandr';

import models from '../../models';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    allUsers: {
      type: new GraphQLList(userType),
      resolve (root, args) {
        return models.User.findAll()
      }
    },
    allComments: {
      type: new GraphQLList(commentType),
      resolve: resolver(models.Comment)
    },
    allKommandrs: {
      type: new GraphQLList(kommandrType),
      resolve: resolver(models.Kommandr)
    },
    user: {
      type: userType,
      args: {
        id: {
          description: 'ID of the user',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(root, args) {
        return models.User.findById(args.id);
      }
    },
    comment: {
      type: commentType,
      args: {
        id: {
          description: 'ID of the comment',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(root, args) {
        return models.Comment.findById(args.id);
      }
    },
    kommandr: {
      type: kommandrType,
      args: {
        id: {
          description: 'ID of the kommandr',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(root, args) {
        return models.Kommandr.findById(args.id);
      }
    },
    collection: {
      type: collectionType,
      args: {
        id: {
          description: 'ID of the collection',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(root, args) {
        return models.Collection.findById(args.id);
      }
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'These are the things we can change',
  fields: () => ({
    deleteArticle: {
      type: ArticleType,
      description: 'Delete an article with id and return the article that was deleted.',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (value, { id }) => {
        return ArticleServices.delete(id);
      }
    }
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType
});

export default schema;
