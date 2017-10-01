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
    loggedInUser: {
      type: userType,
      resolve(root, args, ctx) {
        if (ctx.user === undefined)  return null;
        const { id } = ctx.user;
        return models.User.findById(id).then(user => {
          return user;
        });
      }
    },
    allUsers: {
      type: new GraphQLList(userType),
      resolve(root, args, ctx) {
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
      args: {
        title: {
          description: 'Title of Kommandr',
          type: GraphQLString
        },
        cli: {
          description: 'Content of the CLI',
          type: GraphQLString
        },
      },
      resolve(root, { title, cli }, ctx) {
        return models.Kommandr.findAll({
          where: { 
            $or: [ { title: { $like: `${title}%` } }, { cli: { $like: `${cli}%` } } ]
          }
        });
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
    allUsers: {
      type: new GraphQLList(userType),
      args: {
        username: {
          description: 'User name',
          type: GraphQLString,
        }
      },
      resolve(root, { username }, ctx) {
        return models.User.findAll({
          where: {
            status: 1,
            id: { ne: 0 },
            name: { $like: `${name}%` }
          }
        })
      }
    },
    allCollections: {
      type: new GraphQLList(collectionType),
      args: {
        name: {
          description: 'Name of the collection',
          type: GraphQLString,
        }
      },
      resolve(root, { name }, ctx) {
        return models.Collection.findAll({
          where: {
            name: { $like: `${name}%` }
          }
        });
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
      resolve(root, { id }, ctx) {
        return models.Kommandr.findOne({
          where: { hashId: id }
        }).then(kommandr => {
          kommandr.increment('totalViews');
          return kommandr;
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

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});

export default schema;
