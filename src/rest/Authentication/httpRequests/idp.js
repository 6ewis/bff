import axios from 'axios';
import querystring from 'querystring';

require("dotenv").config();

axios.defaults.withCredentials = true;

export const createUserRegistration = async (username, password) => {
  const data = { username, password };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${
        JSON.parse(process.env.BFF_CLIENT_TOKEN).access_token
      }`
    },
    data: JSON.stringify(data),
    processData: false,
    url: "http://localhost:8080/api/user-registration"
  };

  return axios(options)
    .then(res => {
      console.log("what the hell, ", res.data)
      return res.data;
    })
    .catch(error => {
      console.log("what the hell error", error) 
    });
};

export const verifyUserRegistration = tokenObj => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${
        JSON.parse(process.env.BFF_CLIENT_TOKEN).access_token
      }`
    },
    data: JSON.stringify(tokenObj),
    processData: false,
    url: "http://localhost:8080/api/user-verification"
  };

  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => error);
};

export const pwResetJwtValid = jwt => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${
        JSON.parse(process.env.BFF_CLIENT_TOKEN).access_token
      }`
    },
    data: JSON.stringify(jwt),
    processData: false,
    url: "http://localhost:8080/api/user-reset-password-check"
  };

  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => error);
};

export const requestResetPassword = username => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${
        JSON.parse(process.env.BFF_CLIENT_TOKEN).access_token
      }`
    },
    data: JSON.stringify({ email: username.username }),
    processData: false,
    url: "http://localhost:8080/api/user-forget-password"
  };

  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
    console.log("what the heck", error)
      return { status: 403 };
    });
};

export const resetPassword = ({ jwt, password }) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      Authorization: `Bearer ${
        JSON.parse(process.env.BFF_CLIENT_TOKEN).access_token
      }`
    },
    data: JSON.stringify({ jwt, password }),
    processData: false,
    url: "http://localhost:8080/api/user-reset-password"
  };

  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      return { status: 403 };
    });
};

// user: login
export const getUserToken = (username, password) => {
  const data = {
    grant_type: "password",
    username,
    password
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
      Authorization: `Basic ${Buffer.from(
        `${process.env.BFF_CLIENT_ID}:${process.env.BFF_CLIENT_SECRET}`
      ).toString("base64")}`
    },
    data: querystring.stringify(data),
    processData: false,
    url: "http://localhost:8080/oauth/token"
  };

  return axios(options)
    .then(res => res.data)
    .catch(error => error);
};
