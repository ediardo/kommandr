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
import starType from './types/star';
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
      type: new GraphQLList(starType),
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
          type: GraphQLString,
        },
        cli: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        }
      },
      resolve: (root, { title, cli, description }, ctx) => {
        let where = {};
        if (title || cli || description) {
          where = { $or: [] };
          if (title) where.$or.push({ title: { $like: `${title}%` } });
          if (cli) where.$or.push({ cli: { $like: `${cli}%` } });
          if (description) where.$or.push({ description: { $like: `${description}%` } });  
        }
        return models.Kommandr.findAll({ 
          where,
          include: [{
            model: models.User
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        });
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
        if (!username) username = '';
        return models.User.findAll({
          where: {
            status: 1,
            id: { ne: 0 },
            name: { $like: `${username}%` }
          }
        })
      }
    },

    currentUser: {
      type: userType,
      resolve(root, args, ctx) {
        if (!ctx.user)  return null;
        const { id } = ctx.user;
        return models.User.findById(id);
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
          include: [{
            model: models.User,
          }],
          where: { hashId: id },
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

    myStars: {
      type: new GraphQLList(starType),
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
    },

    searchCollections: {
      type: new GraphQLList(collectionType),
      args: {
        name: {
          type: GraphQLString,
        }
      },
      resolve: (root, { name }, ctx) => {
        let where = { };
        if (name) {
          where = { $or: [{ name: { $like: `${name}%` } }] };
        }
        
        return models.Collection.findAll({ 
          where,
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        });
      }
    },
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});

export default schema;
