import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { assign } from 'lodash';
import models from '../../../models';
import commentType from './comment';
import userType from './user';

const kommandrType = new GraphQLObjectType({
  name: 'Kommandr',
  fields: assign(attributeFields(models.Kommandr), {
    comments: {
      type: new GraphQLList(commentType),
      resolve(kommandr) {
        return kommandr.getComments();
      }
    }
  })
});

export default kommandrType;
