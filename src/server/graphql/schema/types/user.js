import {
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import db from '../../../models';
import activityType from './activity';
import commentType from './comment';
import starType from './star';
import kommandrType from './kommandr';
import collectionType from './collection';
import tokenType from './token';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: user => user.id
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name
    },
    username: {
      type: GraphQLString,
      resolve: user => user.username
    },
    email: {
      type: GraphQLString,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.email
        } 
        return null;
      }
    },
    isPasswordSet: {
      type: GraphQLBoolean,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.isPasswordSet;
        }
        return null;
      }
    },
    isUsernameSet: {
      type: GraphQLBoolean,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.isUsernameSet
        }
        return null;
      }
    },
    website: {
      type: GraphQLString,
      resolve: user => user.website
    },
    externalAvatarUrl: {
      type: GraphQLString,
      resolve: user => user.externalAvatarUrl
    },
    hasSeenWelcome: {
      type: GraphQLBoolean,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.hasSeenWelcome;
        }
        return null;
      }
    },
    createdAt: {
      type: GraphQLString,
      resolve: user => user.createdAt
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.updatedAt;
        }
        return null;
      }
    },
    isLoginEnabled: {
      type: GraphQLBoolean,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.isLoginEnabled;
        }
        return null;
      }
    },
    githubId: {
      type: GraphQLInt,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.githubId;
        }
        return null;
      }
    },
    googleId: {
      type: GraphQLInt,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.googleId;
        }
        return null;
      }
    },
    facebookId: {
      type: GraphQLInt,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.facebookId;
        }
        return null;
      }
    },
    slackId: {
      type: GraphQLInt,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.slackId;
        }
        return null;
      }
    },
    lastSignedIn: {
      type: GraphQLString,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.lastSignedIn;
        }
        return null;
      }
    },
    lastSignedInIp: {
      type: GraphQLInt,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.lastSignedInIp;
        }
        return null;
      }
    },
    forgotPasswordToken: {
      type: GraphQLString,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.forgotPasswordToken;
        }
        return null;
      }
    },
    forgotPasswordExpires: {
      type: GraphQLString,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.forgotPasswordExpires;
        }
        return null;
      }
    },
    status: {
      type: GraphQLInt,
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return user.status
        }
        return null;
      }
    },
    allActivities: {
      type: new GraphQLList(activityType),
      resolve: user => db.Activity.findAll({
        include: [{
          model: db.User,
          where: { id: user.id },
        }],
        order: [
          [ 'createdAt', 'DESC' ]
        ],
      })
    },
    allComments: {
      type: new GraphQLList(commentType),
      resolve: user => {
        return db.Comment.findAll({
          include: [{
            model: db.User,
            where: { id: user.id },
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        });
      }
    },
    allKommandrs: {
      type: new GraphQLList(kommandrType),
      resolve: user => {
        return db.Kommandr.findAll({
          include: [{
            model: db.User,
            where: { id: user.id },
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        });
      }
    },
    allStars: {
      type: new GraphQLList(kommandrType),
      resolve: user => {
        return db.Star.findAll({
          include: [{
            model: db.User,
            where: { id: user.id },
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        }).then(star => {
          return star;
        });
      }
    },
    allCollections: {
      type: new GraphQLList(collectionType),
      resolve: user => {
        return db.Collection.findAll({
          include: [{
            model: db.User,
            where: { id: user.id },
          }],
          order: [
            [ 'createdAt', 'DESC' ]
          ],
        });
      }
    },
    allTokens: {
      type: new GraphQLList(tokenType),
      resolve: (user, args, ctx) => {
        if (ctx.user && ctx.user.id === user.id) {
          return db.Token.findAll({
            include: [{
              model: db.User,
              where: { id: user.id },
            }],
            order: [
              [ 'createdAt', 'DESC' ]
            ]
          })
        }
        return null;
      }
    }
  })
});

export default userType;
