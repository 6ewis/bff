import axios from 'axios'; 
import querystring from 'querystring';
import logger from './util/logger';

require('dotenv').config();

const getClientToken = payload => {
  const data = {
    grant_type: "client_credentials"
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.BFF_CLIENT_ID}:${process.env.BFF_CLIENT_SECRET}`
      ).toString("base64")}`,
      "cache-control": "no-cache"
    },
    data: querystring.stringify(data),
    url: "http://localhost:8080/oauth/token"
  };

  return axios(options).then(res => {
    return res.data;
  });
};

// public key
const getTokenKeys = payload => {
  const options = {
    method: "GET",
    url: "http://localhost:8080/oauth/token_keys"
  };

  return axios(options).then(res => {
    return res.data;
  });
};

const setClientToken = (dataString) => {
  process.env.BFF_CLIENT_TOKEN = dataString;
  // {
  //   "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRldi1qd3QtMSJ9.eyJzY29wZSI6WyJ1c2Vycy5hZG1pbiJdLCJleHAiOjE1NDk0Mjg4MDAsImF1dGhvcml0aWVzIjpbInVzZXJzLmFkbWluIl0sImp0aSI6ImZmNmE2ZjNlLTIyNTgtNDJjNi1iYjIxLTMyMTBkNjAxNzVhMCIsImNsaWVudF9pZCI6ImFsdHJ1aXN0LWFwcCJ9.joDyoBWkjjY5LCEtI8WaeJjlAGKBeJFddA5KdRhTRxJYnEcxpvyArPfLX0E9p3-S4Qp4cnCmvF5L9RaPdCoHmuuDD6eVYNDR5bjbKSdmFhpyh85ctdptZhIuPSme7yymO3gQRbUSPc_mGKLDzb3zG8zS8RAFyQYVjvvQduzqT4dot2OPhszZ5nscXGHPJxYCg3j57R7Xz5tsB2DAeouO6y20WlFwhvAc0mCHYzgDTZ9XW4Kt7hu43qxanwWuiS4g0RLAW8QvsgqfOcmutkCBkoxmpZH7qG3NMXN_yUfHVF3VhtDo-5A0R2bjpqKF72GiGzf9nJW5hqVy-KtbjjAhTw",
  //   "token_type": "bearer",
  //   "expires_in": 35999,
  //   "scope": "users.admin",
  //   "jti": "ff6a6f3e-2258-42c6-bb21-3210d60175a0"
  // }
};

const setTokenKeys = (dataString) => {
  // Dissasemble public key
  process.env.BFF_TOKEN_KEYS = dataString;
  // {
  //   "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRldi1qd3QtMSJ9.eyJzY29wZSI6WyJ1c2Vycy5hZG1pbiJdLCJleHAiOjE1NDk0Mjg4MDAsImF1dGhvcml0aWVzIjpbInVzZXJzLmFkbWluIl0sImp0aSI6ImZmNmE2ZjNlLTIyNTgtNDJjNi1iYjIxLTMyMTBkNjAxNzVhMCIsImNsaWVudF9pZCI6ImFsdHJ1aXN0LWFwcCJ9.joDyoBWkjjY5LCEtI8WaeJjlAGKBeJFddA5KdRhTRxJYnEcxpvyArPfLX0E9p3-S4Qp4cnCmvF5L9RaPdCoHmuuDD6eVYNDR5bjbKSdmFhpyh85ctdptZhIuPSme7yymO3gQRbUSPc_mGKLDzb3zG8zS8RAFyQYVjvvQduzqT4dot2OPhszZ5nscXGHPJxYCg3j57R7Xz5tsB2DAeouO6y20WlFwhvAc0mCHYzgDTZ9XW4Kt7hu43qxanwWuiS4g0RLAW8QvsgqfOcmutkCBkoxmpZH7qG3NMXN_yUfHVF3VhtDo-5A0R2bjpqKF72GiGzf9nJW5hqVy-KtbjjAhTw",
  //   "token_type": "bearer",
  //   "expires_in": 35999,
  //   "scope": "users.admin",
  //   "jti": "ff6a6f3e-2258-42c6-bb21-3210d60175a0"
  // }
};

const initializeClientToken = async () => {
  if (typeof BFF_CLIENT_TOKEN === "undefined") {
    try {
      setClientToken(JSON.stringify(await getClientToken()));
      logger.info("\n ///setClientToken");
      logger.info(process.env.BFF_CLIENT_TOKEN);
    } catch (data) {
      logger.info("\n setClientToken Error", data);
      // console.log(response.data);
    }
  }
}

const initializePublicKeys = async () => {
  if (typeof BFF_TOKEN_KEYS === "undefined") {
    try {
      setTokenKeys(JSON.stringify(await getTokenKeys()));
      logger.info("\n ///setTokenKeys");
      logger.info(process.env.BFF_TOKEN_KEYS);
    } catch (data) {
      console.info("\n setTokenKeys Error", data);
      // console.log(response.data);
    }
  }
}

export default function initializeEnvs() {
  initializeClientToken();
  initializePublicKeys();
}
