import { GraphQLObjectType } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import { assign } from 'lodash';
import models from '../../../models';

const favType = new GraphQLObjectType({
  name: 'Fav',
  fields: assign(attributeFields(models.Fav), {

  })
});

export default favType;
