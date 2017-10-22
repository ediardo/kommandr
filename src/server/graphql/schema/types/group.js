import { GraphQLObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { assign } from 'lodash';
import models from '../../../models';

const groupType = new GraphQLObjectType({
  name: 'Group',
  fields: assign(attributeFields(models.Group))
});

export default groupType;
