import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

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
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        cli: {
          type: new GraphQLNonNull(GraphQLString)
        },
        description: {
          type: GraphQLString
        }
      },
      resolve(parent, { title, cli, description }, ctx) {
        let userId = 0;
        if (ctx.user) userId = ctx.user.id;
        return models.Kommandr.create({
          title,
          cli,
          description,
          userId
        }).then(kommandr => kommandr);
      }
    },

    updateKommandr: {
      type: kommandrType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Kommandr ID'
        },
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Title',
        },
        cli: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'CLI Content',
        },
        description: {
          type: GraphQLString,
        },
      },
      resolve(parent, { id, title, cli, description }, ctx) {
        return models.Kommandr.findOne({
          hashId: id
        }).then(kommandr => {
          if (!ctx.user || ctx.user.id !== kommandr.userId) return null;
          return models.Kommandr.update({ 
            title,
            cli,
            description
          }, { where: { hashId: id } });
        });
      }
    },

    forkKommandr: {
      type: kommandrType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, { id }, ctx) {
        if (!ctx.user) return null;
        return models.Kommandr.findOne({
          where: { hashId: id },
        }).then(kommandr => {
          const { title, cli, description } = kommandr;
          return models.Kommandr.create({
            title,
            cli,
            description,
            forkFrom: id,
            userId: ctx.user.id,
          }, { isForked: true }).then(newKommandr => newKommandr);
        });
      }
    },

    deleteKommandr: {
      type: kommandrType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, { id }, ctx) {
        if (!ctx.user) return null;
        return models.Kommandr.destroy({
          where: { hashId: id, userId: ctx.user.id },
        }).then(affectedRows => {
          return (affectedRows > 0) ? ({ id }) : ({ id: null});
        });
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

    deleteComment: {
      type: commentType,
      args: {
        commentId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, { commentId }, ctx) {
        if (!ctx.user) return null;
        return models.Comment.destroy({
          where: { userId: ctx.user.id, id: commentId },
        }).then(affectedRows => {
          return (affectedRows > 0) ? ({ id: commentId }) : ({ id: null });
        });
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
        // must create a separate mutation to turn on/off notification and one-time off modals
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

    deleteUser: {
      type: userType,
      args: {
        id: { 
          description: 'User ID',
          type: new GraphQLNonNull(GraphQLString) ,
        }
      },
      resolve(parent, { id }, ctx) {
        if (!ctx.user || ctx.user.id !== id) return null;
        return models.User.destroy({
          where: { id },
        }).then(affectedRows => {
          return (affectedRows > 0) ? { id } : { id: -1 };
        });
      }
    },

    favKommandr: {
      type: kommandrType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id }, ctx) {
        if (!ctx.user) return null;
        return models.Kommandr.findOne({
          where: { hashId: id },
        }).then(kommandr => {
          return models.Fav.findOrCreate({ 
            include: [{
              model: models.Kommandr,
              where: { id: kommandr.id },
            }],
            where: { userId: ctx.user.id },
            defaults: {
              userId: ctx.user.id,
              kommandrId: kommandr.id,
            }
          }).spread((fav, created) => {
            return ({ id });
          });  
        });
      }
    },

    unfavKommandr: {
      type: kommandrType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id }, ctx) {
        if (!ctx.user) return null;
        return models.Kommandr.findOne({
          where: { hashId: id },
        }).then(kommandr => {
          return models.Fav.destroy({
            where: { userId: ctx.user.id, kommandrId: kommandr.id }
          }).then(affectedRows => {
            return (affectedRows > 0) ? ({ id }) : ({ id: null });
          });
        });
      }
    },
   /*
    addCollection: {

    },
    
    updateCollection: {

    },

    deleteCollection: {

    },

    addTeam: {

    },

    updateTeam: {

    },

    deleteTeam: {

    },

    addTeamMember: {

    },

    updateTeamMember: {

    },

    removeTeamMember: {

    },
    */
  }
});

export default mutation;
