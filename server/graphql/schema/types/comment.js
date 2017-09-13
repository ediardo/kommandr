import { GraphQLObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { assign } from 'lodash';
import models from '../../../models';

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: assign(attributeFields(models.Comment))
});

export default commentType;
