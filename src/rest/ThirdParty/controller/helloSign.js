import logger from '../../../util/logger';
import cookie from '../../../util/cookie';

export const GetHSEmbeddedUrl = async (req, res) => {
  const { templateId } = req.body;
  const jwt = cookie.getAccess(req);

  try {
    const response = await getHSEmbeddedUrl(jwt, templateId);
    console.log(response.status, response);
    if (response.status < 300) {
      res.status(200).send(response.data);
    } else {
      res.status(response.status).send(response.data.error);
    }
  } catch (error) {
    const status = error.response && error.response.status || 500;
    const errorMessage = error.response && error.response.data || {
      message: "unable to generate sign url"
    };

    res.status(status).send(errorMessage);
  }
};

