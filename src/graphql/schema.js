import { gql } from 'apollo-server-express';

import AumHistorySchema from './AumHistory/schema';
import TopClientsSchema from './TopClients/schema';
import TopHoldingsSchema from './TopHoldings/schema'; 

const LinkSchema = gql`
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

export default [
  LinkSchema,
  AumHistorySchema,
  TopClientsSchema,
  TopHoldingsSchema,
];
