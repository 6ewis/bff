import logger from '../../../util/logger';
import cookie from '../../../util/cookie';

import {
  updateUser,
} from "../httpRequests/user";

export const UpdateUser = async (req, res) => {
  let user = req.body;
  user.id = req.params.id;

  const jwt = cookie.getAccess(req);

  try {
    const response = await updateUser(jwt, user);

    if (response != "undefined") {
      res.status(200).send(response);
    } else {
      res.status(403).send({
        message: "user update failed"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).send({
      message: "user update failed"
    });
  }
};
