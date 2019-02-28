import logger from '../../../util/logger';

import {
  requestResetPassword,
  resetPassword,
  pwResetJwtValid,
} from "../httprequests/idp";

export const RequestForgetPassword = async (req, res) => {
  const { username } = req.body;

  try {
    const response = await requestResetPassword({ username });
    if (response && response.status === 200) {
      res.status(200).send(response.response);
    } else {
      res.status(403).send(response);
    }
  } catch (error) {
    logger.error(error);
    res.status(403).send(error);
  }
};

export const CheckPassword = async (req, res) => {
  const { jwt } = req.body;

  try {
    const response = await pwResetJwtValid({ jwt });
    if (response.status < 300) {
      res.status(200).send(response.response);
    } else {
      res.status(403).send(response);
    }
  } catch (error) {
    logger.error(error);
    res.status(403).send(error);
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const response = await resetPassword(req.body);

    if (response.status < 300) {
      res.status(200).send(response.response);
    } else {
      res.status(403).send(response);
    }
  } catch (error) {
    logger.error(error);
    res.status(403).send(error);
  }
};
