import {
  createUserRegistration,
  verifyUserRegistration,
} from "../httprequests/idp";

export const Register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const thisRes = await createUserRegistration(email, password);

    if (thisRes && thisRes.jwt != "undefined") {
      res.status(200).send(thisRes);
    } else {
      res.status(403).send({
        message: "registration failed"
      });
    }
  } catch (error) {
  console.log("hello what the hell", error);
    res.status(403).send({
      message: "registration failed"
    });
  }
};

export const Verify = (req, res) => {
  // jwt object should be sent in request so we can pass it to the IDP call
  const { jwt } = req.body;

  try {
    verifyUserRegistration({ jwt: jwt })
      .then(thisRes => {
        if (thisRes.status === 200) {
          res.status(200).send(thisRes.data);
        } else {
          res.status(403).send(thisRes);
        }
      })
      .catch(({ config, request, response }) => {
        res.status(403).send({
          message: "verification failed"
        });
      });
  } catch (error) {
    res.status(403).send({
      message: "verification failed"
    });
  }
};
