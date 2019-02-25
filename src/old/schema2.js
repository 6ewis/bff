import { gql } from 'apollo-server-express';

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User
  }

  type Mutation {
    createMessage(text: String!): Message! 
    deleteMessage(id: ID!): Boolean!
  }
`;

export default schema;