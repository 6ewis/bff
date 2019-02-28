export default {
  getAccess: (req) => {
    return req.cookies.access_token || null;
  },

  getRefresh: (req) => {
    return req.cookies.refresh_token || null;
  },

  setAccess: (res, cookieValue) => {
    res.cookie('access_token', cookieValue, {
      maxAge: 99999,
      httpOnly: true,
      signed: false,
      overwrite: true
    });
  },

  setRefresh: (res, cookieValue) => {
    res.cookie('refresh_token', cookieValue, {
      maxAge: 99999,
      httpOnly: true,
      signed: false,
      overwrite: true
    });
  }
};
