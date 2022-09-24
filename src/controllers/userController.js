import JWT from "jsonwebtoken";

import userService from "../services/userService";

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let response = await userService.LogIn(req.body);
    if (response.errCode === 0) {
      let accessToken = JWT.sign(
        response.data,
        process.env.SECRETKEY_ACCESSTOKEN,
        { expiresIn: "30m" }
      );
      let refreshToken = JWT.sign(
        response.data,
        process.env.SECRETKEY_REFRESHTOKEN,
        { expiresIn: "30d" }
      );

      response["accessToken"] = accessToken;
    }
    return res.json(response);
  } catch (error) {
    return res.json({ errCode: -100, msg: "err server" });
  }
};

const signUP = async (req, res, next) => {
  const { email, userName, password } = req.body;

  try {
    let response = await userService.SignUp(req.body);
    if (response.errCode === 0) {
      let accessToken = JWT.sign(
        response.data,
        process.env.SECRETKEY_ACCESSTOKEN,
        { expiresIn: "30m" }
      );
      let refreshToken = JWT.sign(
        response.data,
        process.env.SECRETKEY_REFRESHTOKEN,
        { expiresIn: "30d" }
      );
      response["accessToken"] = accessToken;
    }
    return res.json(response);
  } catch (error) {
    return res.json({ errCode: -100, msg: "err server" });
  }
};

export default {
  logIn,
  signUP,
};
