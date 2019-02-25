import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';
import {TopClientsAPI} from './api';

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => {
    return {
      topClientsAPI: new TopClientsAPI(),
    };
  },
  context: {
    ...models,
    me: models.users[0]
  }
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({port: 8000}, () => {
  console.log('Apollo server on http://localhost:8000/graphql');
});
