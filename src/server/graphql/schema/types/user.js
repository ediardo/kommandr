import {
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import models from '../../../models';
import activityType from './activity';
import commentType from './comment';
import favType from './fav';
import kommandrType from './kommandr';
import collectionType from './collection';

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
      type: GraphQLInt,
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
      resolve: user => models.Activity.findAll({
        include: [{
          model: models.User,
          where: { id: user.id }
        }]
      })
    },
    allComments: {
      type: new GraphQLList(commentType),
      resolve: user => {
        console.log('here');
        return models.Comment.findAll({
          include: [{
            model: models.User,
            where: { id: user.id },
          }],
        });
      }
    },
    allKommandrs: {
      type: new GraphQLList(kommandrType),
      resolve: user => {
        return models.Kommandr.findAll({
          include: [{
            model: models.User,
            where: { id: user.id },
          }],
        });
      }
    },
    allFavs: {
      type: new GraphQLList(favType),
      resolve: user => {
        return models.Fav.findAll({
          include: [{
            model: models.User,
            where: { id: user.id },
          }],
        });
      }
    },
    allCollections: {
      type: new GraphQLList(collectionType),
      resolve: user => {
        return models.Collection.findAll({
          include: [{
            model: models.User,
            where: { id: user.id },
          }]
        });
      }
    }
  })
});

export default userType;
