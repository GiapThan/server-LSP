import JWT from "jsonwebtoken";

import userService from "../services/userService";

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let response = await userService.LogIn({ email, password });
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
  const { email, userName, password, rePassword } = req.body;
  let data;
  try {
    if (password === rePassword) {
      data = await userService.SignUp({ email, userName, password });
      console.log(data);
    }
    return res.json(data);
  } catch (error) {
    return res.json({ errCode: -100, msg: "err server" });
  }
};

export default {
  logIn,
  signUP,
};
