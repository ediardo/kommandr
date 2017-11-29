import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
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
import db from '../../models';
import mutations from './mutations';
import bcrypt from 'bcrypt';
const tokenHash = (token) => bcrypt.hashSync(token, 1);
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
      resolve: (root, { name = '' }, ctx) => {
        return db.Collection.findAll({
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
      resolve: (root, { username }) => {
        return db.Collection.findAll({
          include: [{
            model: db.User,
            where: { username }
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        });
      }
    },

    allComments: {
      type: new GraphQLList(commentType),
      resolve: (root, args) => {
        return db.Comment.findAll({
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
      resolve: (root, { username }, ctx) => {
        if (!ctx.user || ctx.user.username !== username) return null;
        return db.Comment.findAll({
          include: [{
            model: db.User,
            where: { username }
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        })
      }
    },
    
    allStarsByUser: {
      type: new GraphQLList(starType),
      args: {
        username: {
          description: 'User name',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { username }) => {
        return db.Star.findAll({
          include: [{
            model: db.User,
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
      resolve: (root, { title = '', cli = '', description = '' }, ctx) => {
        console.log(ctx.headers);
        let where = {};
        if (title || cli || description) {
          where = { $or: [] };
          if (title) where.$or.push({ title: { $like: `%${title}%` } });
          if (cli) where.$or.push({ cli: { $like: `%${cli}%` } });
          if (description) where.$or.push({ description: { $like: `${description}%` } });  
        }
        return db.Kommandr.findAll({ 
          include: [{
            model: db.User
          }],
          where,
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
      resolve: (root, { username }, ctx) => {
        return db.Kommandr.findAll({
          include: [{
            model: db.User,
            where: { username },
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        });
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
      resolve: (root, { username = '' }, ctx) => {
        return db.User.findAll({
          where: {
            status: 1,
            id: { ne: 0 },
            username: { $like: `${username}%` }
          }
        })
      }
    },

    currentUser: {
      type: userType,
      resolve: (root, args, ctx) => {
        if (!ctx.user)  return null;
        return db.User.findById(ctx.user.id);
      }
    },

    userById: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, { id }) => {
        return db.User.findOne({
          where: { id }
        });
      }
    },

    user: {
      type: userType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, { username } ) => {
        return db.User.findOne({
          where: { username }
        });
      }
    },
    
    commentById: {
      type: commentType,
      args: {
        id: {
          description: 'ID of the comment',
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, { id }) => {
        return db.Comment.findById(
          id,
          {
            include: [{
              model: db.User,
            }],
            order: [
              [ 'createdAt', 'DESC' ]
            ],
          }
        );
      }
    },
    
    kommandrById: {
      type: kommandrType,
      args: {
        id: {
          description: 'ID of the kommandr',
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, { id }, ctx) => {
        return db.Kommandr.findOne({
          include: [{
            model: db.User,
          }],
          where: { hashId: id },
        }).then(kommandr => {
          kommandr.increment('totalViews', {
            silent: true,
          });
          return kommandr;
        });
      }
    },

    collectionById: {
      type: collectionType,
      args: {
        id: {
          description: 'ID of the collection',
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(root, { id }) {
        return db.Collection.findById(
          id,
          {
            include: [{
              model: db.User,
            }],
            order: [
              [ 'createdAt', 'DESC' ]
            ],
          }
        );
      }
    },

    collectionByName: {
      type: collectionType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(root, { name }, ctx) {
        if (!ctx.user) return null;
        return db.Collection.findOne({
          include: [{
            model: db.User,
            where: { id: ctx.user.id },
          }],
          where: {
            name,
          },
        });
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
        return db.Activity.findAll({
          include: [{
            model: db.User,
            where: { username }
          }],
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
