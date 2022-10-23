import JWT from "jsonwebtoken";

import redisClient from "../config/redis";
import userService from "../services/userService";

const logIn = async (req, res, next) => {
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

      redisClient.set(String(response.data.idUser), refreshToken);

      return res
        .cookie("refreshToken", refreshToken, {
          sameSite: "strict",
          path: "/",
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
          httpOnly: false,
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

      redisClient.set(String(response.data.idUser), refreshToken);

      return res
        .cookie("refreshToken", refreshToken, {
          sameSite: "strict",
          path: "/",
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json(response);
    }
    return res.json(response);
  } catch (error) {
    return res.json({ errCode: -100, msg: "err server" });
  }
};

const logOut = async (req, res, next) => {
  redisClient.del(req.idUser);
  return res.clearCookie("refreshToken").json({
    errCode: 0,
    msg: "ok",
  });
};

const refreshToken = async (req, res, next) => {
  const token = req.cookies["refreshToken"];
  if (!token) return res.json({ errCode: -1, msg: "" });
  try {
    let result = JWT.verify(token, process.env.SECRETKEY_REFRESHTOKEN);
    if (result) {
      let redisRefreshToken = await redisClient.get(result.idUser);
      if (!redisRefreshToken) return res.json({ errCode: -2, msg: "" });
      let accessToken = JWT.sign(
        {
          idUser: result.idUser,
          email: result.email,
          userName: result.userName,
          type: result.type,
          roleId: result.roleId,
        },
        process.env.SECRETKEY_ACCESSTOKEN
      );
      res.json({
        errCode: 0,
        data: {
          idUser: result.idUser,
          email: result.email,
          userName: result.userName,
          type: result.type,
          roleId: result.roleId,
          accessToken,
        },
      });
    }
  } catch (error) {
    res.json({
      errCode: -3,
      msg: "",
    });
  }
};
export default {
  logIn,
  signUP,
  logOut,
  refreshToken,
};
