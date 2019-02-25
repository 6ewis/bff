import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    ...models,
    me: models.users[0]
  }
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({port: 8000}, () => {
  console.log('Apollo server on http://localhost:8000/graphql');
});
