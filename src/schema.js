import { gql } from 'apollo-server-express';

import userSchema from './User/schema';
import messageSchema from './Message/schema';

const linkSchema = gql`
  type Query {
    _: Boolean 
  }

  type Mutation {
    _: Boolean 
  }

  type Subscription {
    _: Boolean 
  }
`;

export default [linkSchema, userSchema, messageSchema];
