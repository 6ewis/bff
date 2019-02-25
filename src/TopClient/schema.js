import { gql } from 'apollo-server-express';

// backend call total aumValue
// change does not exist in backend
// rank does not exist
// currency does not exist
const schema = gql`
  extend type Query {
     topClients(sortBy:String, limit: Int, offset: Int): [Client!] 
  }

  type Client {
    name: String 
    cash: Int 
    change: Float
    total: Float
    rank: Float
    currency: String 
  }
`;

export default schema;
