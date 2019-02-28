import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import getPem from 'rsa-pem-from-mod-exp';

const setPublicKey = (dataString) => {
  process.env.BFF_PUBLIC_KEY = dataString;
};

// handles error in auth steps
const handleError = {
  throw: (request, res, next, errorPublic, errorPrivate = null) => {
    // throw an error to exit the auth async function
    throw new Error(errorPrivate != null ? errorPrivate : errorPublic);
  },
  catch: (error) => {
    console.log('Exiting due to error');
    console.log(error);
  }
};

const authStep = {
  cookie: (req, res, next) => {
    if (typeof req.cookies === 'undefined' || typeof req.cookies.access_token === 'undefined') {
      handleError.throw(req, res, next, 'access_token is required for this request');
      return false;
    }

    return true;
  },

  getKeyID: (req, res, next) => {
    const { header } = jwt.decode(req.cookies.access_token, { complete: true });

    if (typeof header.kid != 'undefined') return header.kid;

    handleError.throw(req, res, next, 'could not get key ID from provided jwt');
    return false;
  },

  getKey: (req, res, next) => {
    const foundKey = JSON.parse(process.env.BFF_TOKEN_KEYS).keys.filter((obj) =>
      Object.values(obj).includes(req.keyid)
    )[0];

    if (typeof foundKey != 'undefined') {
      authStep.setKey(foundKey);
      return foundKey;
    }
    handleError.throw(req, res, next, 'access_token is required for this request');
    return false;
  },

  //
  setKey: (foundKey) => {
    if (typeof process.env.BFF_PUBLIC_KEY === 'undefined') {
      setPublicKey(JSON.stringify(getPem(foundKey.n, foundKey.e)));
    }
  },

  validateJWT: (req, res, next) => {
    jwt.verify(req.cookies.access_token, JSON.parse(process.env.BFF_PUBLIC_KEY), { algorithms: ['RS256'] }, (error, authData) => {
      if (error) handleError.throw(req, res, next, 'Could not validate JWT', error);
      req.authorization = authData;
      authStep.success(req, res, next);
    });
  },

  success: (req, res, next) => {
    next();
  }
};

// for each request, validate auth token
// along the way, we pass authorization data into the request to be used by graphql requests
export const authMiddleware = async (req, res, next) => {

    try {
      authStep.cookie(req, res, next);
      logger.info("verify token in cookie: done")
    } catch (error) {
      handleError.catch(error);
      return;
    }

    try {
      req.keyid = authStep.getKeyID(req, res, next);
      logger.info("get the keyID from the auth token: done")
    } catch (error) {
      handleError.catch(error);
      return;
    }

    try {
      req.key = authStep.getKey(req, res, next);
      logger.info("get the public key using the keyID: done");
    } catch (error) {
      handleError.catch(error);
      return;
    }

    try {
      authStep.validateJWT(req, res, next);
      logger.info("validate JWT: done");
    } catch (error) {
      handleError.catch(error);
      return;
    }

  };

export default authMiddleware;
