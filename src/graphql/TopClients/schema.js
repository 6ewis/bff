import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
     topClients(sortBy: String, limit: Int, offset: Int): [Client!] 
  }

  type Client {
    primaryOwnerFirstName: String!
    primaryOwnerLastName: String!
    aumValue: Float!
    aumPercentage: Float!
  }
`;

export default schema;
