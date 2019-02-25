import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Message {
    id: ID!
    text: String!
    user: User
  }

  extend type Mutation {
    createMessage(text: String!): Message! 
    deleteMessage(id: ID!): Boolean!
  }
`;

export default schema;
