import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import db from '../../models';
import kommandrType from './types/kommandr';
import collectionType from './types/collection';
import userType from './types/user';
import commentType from './types/comment';
import reportType from './types/report';
import tokenType from './types/token';
//import teamType from './types/team';
const tokenHash = (token) => bcrypt.hashSync(token, 1);

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
      resolve: (root, { title, cli, description }, ctx) => {
        let userId = 0;
        if (ctx.user) {
          userId = ctx.user.id;
        }
        return db.Kommandr.create({
          title,
          cli,
          description,
          userId
        });
      }
    },

    updateKommandr: {
      type: kommandrType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
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
      resolve: (root, { id, title, cli, description }, ctx) => {
        if (!ctx.user) return null;
        return db.Kommandr.update({ 
          title,
          cli,
          description
        },
        {
          where: { 
            hashId: id,
            userId: ctx.user.id
          }
        }).then(affectedRows => {
          if (affectedRows > 0) {
            return db.Kommandr.findOne({
              include: [{
                model: db.User,
              }],
              where: { hashId: id, userId: ctx.user.id }
            });
          } else {
            return null;
          }
        });
      }
    },

    forkKommandr: {
      type: kommandrType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, { id }, ctx) => {
        if (!ctx.user) return null;
        return db.Kommandr.findOne({
          where: { hashId: id },
        }).then(kommandr => {
          const { id, title, cli, description } = kommandr;
          return db.Kommandr.create({
            title,
            cli,
            description,
            forkFrom: id,
            userId: ctx.user.id,
          }, { isForked: true });
        });
      }
    },

    deleteKommandr: {
      type: kommandrType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, { id }, ctx) => {
        if (!ctx.user) return null;
        return db.Kommandr.findOne({
          where: {
            hashId: id,
            userId: ctx.user.id
          }
        }).then(kommandr => {
          return db.Kommandr.destroy({
            where: {
              id: kommandr.id,
            }
          }).then(affectedRows => {
            if (affectedRows > 0) return kommandr
          });
        });
      }
    },

    reportKommandr: {
      type: reportType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        reason: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, { id, reason }, ctx) => {
        if (!ctx.user) return null;
        if (reason !== 'spam' || reason !== 'fake' || reason !== 'dangerous') reason = 'spam';
        return db.Kommandr.findOne({
          where: { 
            hashId: id
          }
        }).then(kommandr => {
          return db.Report.create({
            userId: ctx.user.id,
            kommandrId: kommandr.id,
            reason,
          });
        });
      }
    },

    starKommandr: {
      type: kommandrType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
      },
      resolve: (root, { id }, ctx) => {
        if (!ctx.user) return null;
        return db.Kommandr.findOne({
          where: { hashId: id },
        }).then(kommandr => {
          return db.Star.findOrCreate({ 
            where: {
              kommandrId: kommandr.id,
              userId: ctx.user.id
            },
            defaults: {
              userId: ctx.user.id,
              kommandrId: kommandr.id,
            }
          }).spread((star, created) => {
            return kommandr;    
          });  
        });
      }
    },
/*
    unstarKommandr: {
      type: kommandrType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
      },
      resolve: (root, { id }, ctx) => {
        if (!ctx.user) return null;
        return db.Star.findOne({
          include: [
            {
              model: db.Kommandr,
              where: { hashId: id },
            },
            {
              mode: db.User, 
              where: { id: ctx.user.id },
            }
          ],
        }).then(star => {
          return db
          return db.Star.destroy({
            where: { id: star.id }
          }).then(affectedRows => {
            if (affectedRows > 0) return star;
          });
        });
      }
    },
    */

    addComment: {
      type: commentType,
      args: {
        kommandrId: {
          type: new GraphQLNonNull(GraphQLID)
        },
        comment: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve: (root, { kommandrId, comment }, ctx) => {
        if (!ctx.user) return null;
        return db.Kommandr.findOne({
          where: { hashId: kommandrId }
        }).then(kommandr => {
          return db.Comment.create({ 
            kommandrId: kommandr.id, 
            userId: ctx.user.id,
            comment 
          }).then(comment => {
            console.log(comment);
          });
        });
      }
    },

    deleteComment: {
      type: commentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
      },
      resolve: (root, { id }, ctx) => {
        if (!ctx.user) return null;
        return db.Comment.findOne({
          where: { id, userId: ctx.user.id }
        }).then(comment => {
          return comment.destroy().then(affectedRows => (affectedRows === 1) ? ({ id }) : null);
        });
      }
    },

    addUser: {
      type: userType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(root, { username, email, password }) {
        return db.User.create({ email, password });
      }
    },

    updateUser: {
      type: userType,
      args: {
        email: {
          type: GraphQLString,
        },
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString,
        },
        website: {
          type: GraphQLString,
        },
        enableLogin: {
          type: GraphQLBoolean,
        },
      },
      resolve: (root, { email, username, password, name, website }, ctx) => {
        if (!ctx.user) return null;
        let userFields = {};
        if (username) {
          userFields = {
            ...userFields,
            username,
            isUsernameSet: true,
          };
        }
        if (password) {
          userFields = { 
            ...userFields, 
            password,
            isPasswordSet: true,
          };
        }
        if (name) {
          userFields = { ...userFields, name };
        }
        if (website) {
          userFields = { ...userFields, website };
        }
        // NOTE (ediardo):
        // must create a separate mutation to turn on/off notification and one-time off modals
        userFields = { 
          ...userFields,
          hasSeenWelcome: 1,
        };

        db.User.findOne({
          where: { id: ctx.user.id },
        }).then(user => {
          return db.User.update(
            userFields, 
            {
              where: { id: ctx.user.id } 
            }
          ).then(affectedRows => (affectedRows === 1) ? db.User.findById(ctx.user.id) : user );
        });
      }
    },

    deleteUser: {
      type: userType,
      args: {
        id: { 
          description: 'User ID',
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, { id }, ctx) => {
        if (!ctx.user || ctx.user.id !== id) return null;
        db.User.findOne({
          where: { id }
        }).then(user => {
          user.destroy().then(affectedRows => (affectedRows === 1) ? ({ id }) : null);
        });
      }
    },
    
    addCollection: {
      type: collectionType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        description: {
          type: GraphQLString,
        },
        matchRegex: {
          type: GraphQLString,
        },
        matchAllTime: {
          type: GraphQLBoolean
        },
        isEnabled: {
          type: GraphQLBoolean,
        },
      },
      resolve: (root, { name, description, matchRegex, matchAllTime, isEnabled }, ctx) => {
        if (!ctx.user) return null;
        return db.Collection.create({
          name,
          description,
          matchRegex,
          matchAllTime,
          isEnabled,
          userId: ctx.user.id,
        });
      }
    },
    
    updateCollection: {
      type: collectionType,
      args: {
        id: { 
          type: new GraphQLNonNull(GraphQLID),
        },
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        description: {
          type: GraphQLString,
        },
        matchRegex: {
          type: GraphQLString,
        },
        matchAllTime: {
          type: GraphQLBoolean,
        },
        isEnabled: {
          type: GraphQLBoolean,
        }
      },
      resolve: (root, { id, name, description, matchRegex, matchAllTime = true, isEnabled = true }, ctx) => {
        if (!ctx.user) return null;
        var updateFields = {};
        if (name) {
          updateFields = { ...updateFields, name };
        }
        if (description) {
          updateFields = { ...updateFields, description };
        }
        if (matchRegex) {
          updateFields = { ...updateFields, matchRegex };
        }
        if (matchAllTime !== undefined ) {
          updateFields = { ...updateFields, matchAllTime };
        }
        if (isEnabled !== undefined) {
          updateFields = { ...updateFields, isEnabled };
        }

        return db.Collection.findOne({
          where: { id, userId: ctx.user.id },
        }).then(collection => {
          return db.Collection.update(
            updateFields,
            {
              where: { id }
            }
          ).then(affectedRows => {
            return db.Collection.findOne({
              include: [{
                model: db.User,
                where: { id: ctx.user.id }
              }],
              where: { id }
            })
          });
        });
      }
    },
    
    deleteCollection: {
      type: collectionType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (root, { id }, ctx) => {
        db.Collection.findOne({
          where: { id, userId: ctx.user.id }
        }).then(collection => {
          return collection.destroy().then(affectedRows => (affectedRows === 1) ? ({ id }) : null);
        });
      }
    },

    addToken: {
      type: tokenType,
      args: {
        name: {
          type: GraphQLString,
        },
      },
      resolve: (root, { name }, ctx) => {
        if (!ctx.user) return null;
        var tokenHash = crypto.createHash('sha256')
          .update(Date.now().toString())
          .digest('hex');
        return db.Token.create({
          name,
          userId: ctx.user.id,
          tokenHash,
          tokenHint: tokenHash.substr(-4),
        }).then(token => {
          token.tokenHash = tokenHash;
          return token;
        });
      }
    }
    /*
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

    acceptTeamMemberRequest: {

    },

    deleteTeamMember: {

    },
    */
  }
});

export default mutation;
