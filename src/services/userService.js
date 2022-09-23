import bcrypt from "bcrypt";

import User from "../models/userModel";

const SALT = +process.env.SALT;

const SignUp = ({ email, userName, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ email });
      if (!user) {
        let hashPassword = await bcrypt.hash(password, SALT);
        let newUser = await User.create({
          email,
          userName,
          password: hashPassword,
        });
        if (newUser) {
          resolve({ email: newUser.email, userName: newUser.userName });
        }
      } else {
        resolve({ errCode: -1, msg: "user had already" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const LogIn = ({ email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ email });
      if (user) {
        let result = await bcrypt.compare(password, user.password);
        if (result) {
          resolve({
            errCode: 0,
            msg: "ok",
            data: {
              email: user.email,
              userName: user.userName,
              type: user.type,
            },
          });
        } else {
          resolve({ errCode: -1, msg: "incorrect password" });
        }
      } else {
        resolve({ errCode: -2, msg: "email doesn't exist" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  SignUp,
  LogIn,
};
