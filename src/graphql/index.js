require('dotenv').config()

import express from 'express';
import { 
  ApolloServer,
  AuthenticationError
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import api from './api';
import logger from "../util/logger";
import authStep from '../util/authSteps';

export default function startGraphql(app) { 
  // *** fake data ***//
  app.get('/api/advisors/:userId/clients', (req, res) => {
    const response = [
      {
        "userAccount" : "2",
        "primaryOwnerFirstName" : "lewis",
        "primaryOwnerLastName" : "Dackam"
      },
      {
        "userAccount" : "1",
        "primaryOwnerFirstName" : "Olivia",
        "primaryOwnerLastName" : "Blue"
      }
      ];
  
      res.send(response);
    });
  
  app.post('/api/analytic/top-holdings', (req, res) => {
    const response = [
      {
        "ticker" : "AAPL", 
        "securityName" : "APPLE INC",
        "price" : 339.39,
        "holdingValue" : 300000
      },
      {
        "ticker" : "NTFL", 
        "securityName" : "NETFLIX",
        "price" : 499,
        "holdingValue" : 490000
      },
    ];
  
    res.send(response);
  });
  
  app.post('/api/analytic/advisor-aum', (req, res) => {
    const response = [
      {
        "date" : "2018-12-06",
        "aumValue" : "12.9999",
        "marketChanged" : "333999",
        "flowChanged" : "12000",
      },
      {
        "date" : "1998-11-11",
        "aumValue" : "1.2",
        "marketChanged" : "11.11",
        "flowChanged" : "1111",
      },
    ];
  
    res.send(response);
  });
  
  
  app.post('/api/analytic/top-clients', (req, res) => {
    const response = [
       {
   
         "userAccount" : "1",
   
         "aumPercentage" : 75.5,
   
         "aumValue" : 175900
   
       },
       {
   
         "userAccount" : "2",
   
         "aumPercentage" : 88.5,
   
         "aumValue" :80000 
   
       }
     ];
   
     res.send(response);
   });
   
  const server = new ApolloServer({
     typeDefs: schema,
     resolvers,
     dataSources: () => api,
     context: async ({ req }) => {
       if (!await authStep(req)) {
         throw new AuthenticationError('must authenticate');
       };

       return { 
         token: 12131313,
         env: process.env.BFF_HOST
       }
     },
     formatError: error => {
       logger.error(error);
       return new Error("Internal server error");
     }
   });
   
   server.applyMiddleware({ cors: true, bodyParser: true, app, path: '/graphql' });

   return server;
}
