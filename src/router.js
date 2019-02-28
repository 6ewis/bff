import express from 'express';

import authRoutes from './rest/Authentication/routes';
import userRoutes from './rest/User/routes';
import thirdPartyRoutes from './rest/ThirdParty/routes';

import authStep from './util/authSteps';

export default (app) => {
  // Initializing route groups
  const restRoutes = express.Router();

  restRoutes.use('/', authRoutes);
  restRoutes.use('/', userRoutes);
  restRoutes.use('/', thirdPartyRoutes);

  // Set url for API group routes
  app.use('/api', restRoutes);
  
  // Error handling 404
  app.use((req, res) => {
    const err = new Error('Invalid API endpoint');

    err.url = req.protocol + "://" + req.get("host") + req.originalUrl;
    err.status = 404;

    res.status(err.status);
    res.send({error: err});
  });

  // Error handling 500
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({error: 'Failure on request'});
  });

};
