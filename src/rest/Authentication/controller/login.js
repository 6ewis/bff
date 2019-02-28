import logger from '../../../util/logger';
import cookie from '../../../util/cookie';

import {
  getUserToken,
} from "../httpRequests/idp";

import {
  getUserInfo,
} from "../../User/httpRequests/user";

export const Login = (req, res) => {
  const { username, password } = req.body;
  
  try {
    getUserToken(username, password)
      .then(thisRes => {
        // set the auth cookie
        console.log(
          `your auth token is good for: ${thisRes.expires_in / 60} min`
        );
        cookie.setAccess(res, thisRes.access_token);

        getUserInfo(thisRes.access_token).then(response => {
          thisRes.user = response;
          res.status(200).send(thisRes);
        });
      })
      .catch((error) => {
        logger.error(error);
        res.status(403).send({
          message: "login failed"
        });
      });
  } catch (error) {
    logger.error(error);
    res.status(403).send({
      message: "login failed"
    });
  }
};
