require("dotenv").config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

import initializeEnvs from "./initializeEnvs";
import startGraphql from './graphql';
import logger from './util/logger';
import router from './router';

const app = express();

//= ====================================================
//  Setting up basic middleware for all Express requests
//= ====================================================

// Log requests to API using morgan
app.use(require("morgan")("combined", { "stream": logger.stream.write }));
app.use(compression()); // use for performance best practice
app.use(bodyParser.urlencoded({limit: '50mb', extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json({limit: '50mb'})); // Send JSON responses
// Enable CORS from client-side
app.use(
  cors({
    origin: process.env.CORS_DOMAIN || 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
  })
);

// Parse cookies 
app.use(cookieParser());

// app.use('/graphql', (req, res) => console.error("it works"))

//= ====================================================
//  Initializing Graphql
//= ====================================================
// // Mount my middleware to  run *before* Apollo which can break the request chain if required
// app.use("/graphql", () => console.log("here you go"));

// Mount Apollo middleware
const graphQLServer = startGraphql(app);

//= ====================================================
//  Starting server
//= ====================================================

// Import routes to be served
// Should come after graphql
router(app);

// Initializing important env variables
initializeEnvs();

const port = process.env.PORT || 4000;
app.listen({ port }, () => {
  logger.info( `🚀 Rest Server ready at http://localhost:${port}`);
  logger.info( `🚀 Graphql Server ready at http://localhost:${port}${graphQLServer.graphqlPath}`);
});
