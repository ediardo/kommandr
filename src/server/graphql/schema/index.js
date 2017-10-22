import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql';

import activityType from './types/activity';
import collectionType from './types/collection';
import commentType from './types/comment';
import favType from './types/fav';
import kommandrType from './types/kommandr';
import userType from './types/user';
import models from '../../models';
import mutations from './mutations';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    allCollections: {
      type: new GraphQLList(collectionType),
      args: {
        name: {
          description: 'Name of the collection',
          type: GraphQLString,
        },
      },
      resolve(root, { name, username }, ctx) {
        return models.Collection.findAll({
          attributes: [ 'userId', 'name', 'description', 'totalKommandrs', 'createdAt', 'updatedAt' ],
          include: [{
            model: models.User,
            where: { username },
          }],
          where: { name: { $like: `${name}%` }  },
          order: [
            [ 'createdAt', 'DESC' ]
          ],
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

    allComments: {
      type: new GraphQLList(commentType),
      resolve (root, args) {
        return models.Comment.findAll({
          attributes: [ 'id', 'userId', 'kommandrId', 'comment', 'createdAt', 'updatedAt' ],
          order: [
            [ 'createdAt', 'DESC' ]
          ]
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
      resolve(root, { username }, ctx) {
        if (!ctx.user || ctx.user.username !== username) return null;
        return models.Comment.findAll({
          attributes: [ 'id', 'userId', 'kommandrId', 'comment', 'createdAt', 'updatedAt' ],
          include: [{
            model: models.User,
            where: { username }
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
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
          attributes: [ 'id', 'userId', 'kommandrId', 'createdAt' ],
          include: [{
            model: models.User,
            where: { username },
          }],
          order: [
            [ 'createdAt', 'DESC' ],
          ],
        });
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
        username: {
          description: 'User name',
          type: GraphQLString,
        },
      },
      resolve(root, { title, cli, username }, ctx) {
        if (username) {
          return models.Kommandr.findAll({
            attributes: ['userId', 'title', 'cli', 'createdAt', 'updatedAt', 'description', ['hashId', 'id']],
            include: [{
              model: models.User,
              where: { username }
            }],
            where: { 
              $or: [ { title: { $like: `${title}%` } }, { cli: { $like: `${cli}%` } } ]
            },
          }).then(kommandrs => kommandrs);
        } else {
          return models.Kommandr.findAll({
            attributes: ['userId', 'title', 'cli', 'createdAt', 'updatedAt', 'description', ['hashId', 'id']],
            where: { 
              $or: [ { title: { $like: `${title}%` } }, { cli: { $like: `${cli}%` } } ]
            },
            order: [
              [ 'createdAt', 'DESC' ],
            ],
          }).then(kommandrs => kommandrs);
        }
      }
    },

    allKommandrsByUser: {
      type: new GraphQLList(kommandrType),
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(root, { username }, ctx) {
        return models.Kommandr.findAll({
          attributes: ['userId', 'title', 'cli', 'createdAt', 'updatedAt', 'description', ['hashId', 'id']],
          include: [{
            model: models.User,
            where: { username },
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        }).then(kommandrs => kommandrs);
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
            name: { $like: `${username}%` }
          }
        })
      }
    },

    loggedInUser: {
      type: userType,
      resolve(root, args, ctx) {
        if (!ctx.user)  return null;
        const { id } = ctx.user;
        return models.User.findById(id).then(user => {
          return user;
        });
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
          where: { hashId: id },
          attributes: ['userId', 'title', 'cli', 'createdAt', 'updatedAt', 'description', ['hashId', 'id']]
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
    },
    myFavs: {
      type: new GraphQLList(favType),
      resolve(root, args, ctx) {
        if (!ctx.user) return null;
        return models.Fav.findAll({
          where: { userId: ctx.user.id }
        }).then(myFavorited => myFavorited);
      }
    },
    myKommandrs: {
      type: new GraphQLList(kommandrType),
      resolve(root, args, ctx) {
        if (!ctx.user) return null;
        return models.Kommandr.findAll({
          where: { userId: ctx.user.id },
          attributes: [['hashId', 'id']]
        })
      }
    },
    getActivity: {
      type: new GraphQLList(activityType),
      args: {
        username: {
          description: 'User name',
          type: GraphQLString,
        }
      },
      resolve(root, { username }, ctx) {
        return models.Activity.findAll({
          include: [{
            model: models.User,
            where: { username }
          }]
        }).then(activities => activities);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});

export default schema;
