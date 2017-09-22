import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { assign } from 'lodash';
import { resolver } from 'graphql-sequelize';

import models from '../../../models';
import commentType from './comment';
import kommandrType from './kommandr';
import collectionType from './collection';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: assign(attributeFields(models.User), {
    comments: {
      type: new GraphQLList(commentType),
      resolve(user) {
        return user.getComments();
      }
    },
    kommandrs: {
      type: new GraphQLList(kommandrType),
      resolve(user) {
        return user.getKommandrs();
      }
    },
    collections: {
      type: new GraphQLList(collectionType),
      resolve(user) {
        return user.getCollections();
      }
    }
  })
});

export default userType;
