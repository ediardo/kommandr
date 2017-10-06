import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import Hashids from 'hashids';

import favType from './types/fav';
import models from '../../models';
import kommandrType from './types/kommandr';
import userType from './types/user';
import commentType from './types/comment';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addKommandr: {
      type: kommandrType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        cli: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString }
      },
      resolve(parent, { title, cli, description }, ctx) {
        let userId = 0;
        if (ctx.user) userId = ctx.user.id;
        return models.Kommandr.max('id').then(max => {
          var hashId = new Hashids('kommandr', 6);          
          return models.Kommandr.create({ 
            hashId: hashId.encode(max),
            title,
            cli,
            description,
            userId
          });          
        });
      }
    },
    updateKommandr: {
      type: kommandrType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        cli: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parent, { id, title, cli, description }) {
        return models.Kommandr.update({ title, cli, description }, { where: { hashId: id } });
      }
    },
    addComment: {
      type: commentType,
      args: {
        kommandrId: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        comment: { type: GraphQLString }
      },
      resolve(parent, { kommandrId, userId, comment }) {
        return models.Comment.create({ kommandrId, userId, comment })
      }
    },
    addUser: {
      type: userType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { email, password }) {
        // Temporary using clear-text passwords :(
        return models.User.create({ email, password })
      }
    },
    updateUser: {
      type: userType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, { username, password }, ctx) {
        if (!ctx.user) return null;
        let userFields = {};
        if (username) {
          userFields = { ...userFields, username };
        }
        if (password) {
          userFields = { ...userFields, password };
        }
        // NOTE (ediardo):
        // must create a separate mutation to turn on/off notification and one-time off moddals
        userFields = { 
          ...userFields,
          hasSeenWelcome: 1,
          isPasswordSet: 1
        };
        return models.User.update(userFields, { where: { id: ctx.user.id } })
          .then(count => {
            return models.User.findById(ctx.user.id);
          });
      }
    },
    addFav: {
      type: favType,
      args: {
        kommandrId: { type: GraphQLString },
      },
      resolve(parent, { kommandrId }, ctx) {
        if (!ctx.user) return null;
        return models.Kommandr.findOne({
          where: { hashId: kommandrId },
        }).then(kommandr => {
          return models.Fav.findOrCreate({ 
            where: { kommandrId: kommandr.id, userId: ctx.user.id },
            defaults: {
              userId: ctx.user.id,
              kommandrId: kommandr.id,
            }
          }).spread((fav, created) => {
            if (created) {
              console.log('Created fav');0
            }
            return fav;
          });
        });
        
      }
    },

    /*
    saveAction: {
      type: actionType,
      args: {
        targetId: { type: new GraphQLNonNull(GraphQLInt) },
        targetType: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { targetId, targetType }, ctx) {
        if (!ctx.user) return null;
        switch (targetType) {
          case 'fav':
            break;
          case 'fork':
            break;
          case 'report':
            break;
          default:
            return null;
        }
      }
    }*/
  }
});

export default mutation;
