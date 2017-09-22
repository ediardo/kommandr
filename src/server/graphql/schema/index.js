import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql';

import userType from './types/user';
import commentType from './types/comment';
import kommandrType from './types/kommandr';
import collectionType from './types/collection';
import favType from './types/fav';

import models from '../../models';

import mutations from './mutations';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    loginUser: {
      type: userType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        password: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(root, { email, password }) {
        // EXTREMELY INSECURE: Temporary using clear-text passwords.
        return models.User.findOne({
          where: { email, password }
        })
      }
    },
    allUsers: {
      type: new GraphQLList(userType),
      resolve(root, args) {
        console.log(root);
        return models.User.findAll()
      }
    },
    allComments: {
      type: new GraphQLList(commentType),
      resolve (root, args) {
        return models.Comment.findAll();
      }
    },
    allKommandrs: {
      type: new GraphQLList(kommandrType),
      resolve(root, args) {
        return models.Kommandr.findAll();
      }
    },
    allKommandrsByUser: {
      type: new GraphQLList(kommandrType),
      args: {
        username: {
          description: 'User name',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(root, { username }) {
        return models.Kommandr.findAll({
          include: [{
            model: models.User,
            where: { username }
          }]
        })
      }
    },
    allCommentsByUser: {
      type: new GraphQLList(commentType),
      args: {
        username: {
          description: 'User name',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(root, { username }) {
        return models.Comment.findAll({
          include: [{
            model: models.User,
            where: { username }
          }]
        })
      }
    },
    allCollectionsByUser: {
      type: new GraphQLList(collectionType),
      args: {
        username: {
          description: 'User name',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(root, { username }) {
        return models.Collection.findAll({
          include: [{
            model: models.User,
            where: { username }
          }]
        })
      }
    },
    allFavsByUser: {
      type: new GraphQLList(favType),
      args: {
        username: {
          description: 'User name',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(root, { username }) {
        return models.Fav.findAll({
          include: [{
            model: models.User,
            where: { username }
          }]
        })
      }
    },
    user: {
      type: userType,
      args: {
        username: {
          description: 'User name',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(root, { username }) {
        return models.User.findOne({
          where: { username }
        });
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
    kommandrById: {
      type: kommandrType,
      args: {
        id: {
          description: 'ID of the kommandr',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(root, { id }) {
        console.log('here');
        return models.Kommandr.findOne({
          where: { hashId: id }
        });
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

/*
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

*/
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});

export default schema;
