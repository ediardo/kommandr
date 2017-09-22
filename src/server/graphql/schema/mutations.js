import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import Hashids from 'hashids';
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
      resolve(parent, { title, cli, description }) {
        return models.Kommandr.max('id').then(max => {
          var hashId = new Hashids('kommandr', 6);          
          return models.Kommandr.create({ hashId: hashId.encode(max), title, cli, description, userId: 2 })          
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
    }
  }
});

export default mutation;
