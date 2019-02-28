import axios from 'axios';
import querystring from 'querystring';

require("dotenv").config();

export const updateUser = (jwt, user) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      "cache-control": "no-cache"
    },
    data: JSON.stringify(user),
    url: `http://localhost:8081/api/users/${user.id}/user-profile`
  };

  return axios(options).then(res => {
    return res.data;
  });
};

export const getUserInfo = jwt => {
  const options = {
    method: "GET",
    headers: {
      "cache-control": "no-cache",
      Authorization: `Bearer ${jwt}`
    },
    processData: false,
    url: "http://localhost:8081/api/user-info"
  };

  return axios(options).then(res => res.data);
};
