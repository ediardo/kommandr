import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

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
          return models.Kommandr.create({
            title,
            cli,
            description,
            userId
          }, { nextId: max + 1 }).then(kommandr => kommandr);
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
    favKommandr: {
      type: kommandrType,
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
              return kommandr.increment('totalFavs').then(kommandr => kommandr);
            } else {
              return kommandr;
            }
          });
        });
        
      }
    },
    unfavKommandr: {
      type: kommandrType,
      args: {
        kommandrId: { type: GraphQLString },
      },
      resolve(parent, { kommandrId }, ctx) {
        if (!ctx.user) return null;
        return models.Kommandr.findOne({
          where: { hashId: kommandrId }
        }).then(kommandr => {
          return models.Fav.findOne({
            where: { kommandrId: kommandr.id, userId: ctx.user.id },
          }).then(fav => {
            fav.destroy();
            return kommandr.decrement('totalFavs').then(kommandr => kommandr);            
          });
        });
      }
    },
    forkKommandr: {
      type: kommandrType,
      args: {
        kommandrId: { type: GraphQLString },
      },
      resolve(parent, { kommandrId }, ctx) {
        if (!ctx.user) return null;
        return models.Kommandr.findOne({
          where: { hashId: kommandrId, userId: ctx.user.id },
        }).then(kommandr => {
          const { title, cli, description } = kommandr;
          return models.Kommandr.max('id').then(max => {
            return models.Kommandr.create({
              title,
              cli,
              description,
              userId: ctx.user.id,
            }, { nextId: max + 1 }).then(newKommandr => {
              kommandr.increment('totalForks');
              return newKommandr;
            });
          });
        });
      }
    },
    deleteKommandr: {
      type: kommandrType,
      args: {
        kommandrId: { type: GraphQLString },
      },
      resovle(parent, { kommandrId }, ctx) {
        if (!ctx.user) return null;
        return models.Kommandr.findOne({
          where: { hashId: kommandrId, userId: ctx.user.id },
        }).then(kommandr => {
          kommandr.destroy();
        });
      }
    }
  }
});

export default mutation;
