import JWT from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  //.Authorization;
  console.log("token", token);
  try {
    let result = JWT.verify(token, process.env.SECRETKEY_ACCESSTOKEN);
    if (result) {
      console.log(result);
      next();
    }
  } catch (error) {
    console.log(error);
    return res.json({
      errCode: -99,
      msg: error.name,
    });
  }
};
