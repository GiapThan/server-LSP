import JWT from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    let result = JWT.verify(token, process.env.SECRETKEY_ACCESSTOKEN);
    if (result) {
      req.idUser = result.idUser;
      next();
    }
  } catch (error) {
    return res.json({
      errCode: -99,
      msg: error.name,
    });
  }
};
