import JWT from "jsonwebtoken";

import userService from "../services/userService";

const logIn = async (req, res, next) => {
  console.log(req.headers);
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

      response.data["accessToken"] = accessToken;
      return res
        .cookie("refreshToken", refreshToken, {
          sameSite: "strict",
          path: "/",
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
          httpOnly: false,
        })
        .cookie("status", "200", {
          path: "/",
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        })
        .json(response);
    }
    return res.json(response);
  } catch (error) {
    return res.json({ errCode: -100, msg: "err server" });
  }
};

const signUP = async (req, res, next) => {
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
      response.data["accessToken"] = accessToken;
      return res
        .cookie("refreshToken", refreshToken, {
          sameSite: "strict",
          path: "/",
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .cookie("status", "200", {
          path: "/",
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        })
        .json(response);
    }
    return res.json(response);
  } catch (error) {
    return res.json({ errCode: -100, msg: "err server" });
  }
};

const logOut = async (req, res, next) => {
  
}

export default {
  logIn,
  signUP,
  logOut
};
