import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
     topHoldings(sortBy:String, limit: Int, offset: Int): [Holding!] 
  }

  type Holding {
    ticker: String!,
    securityName: String!,
    price: Float!,
    holdingValue: Float!,
  }
`;

export default schema;
