import { GraphQLObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { assign } from 'lodash';
import models from '../../../models';

const collectionType = new GraphQLObjectType({
  name: 'Collection',
  fields: assign(attributeFields(models.Collection))
});

export default collectionType;
