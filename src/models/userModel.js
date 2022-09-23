import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

const Users = new Schema(
  {
    userName: { type: String },
    password: { type: String },
    email: { type: String },
    type: { type: String, default: "local" },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

Users.plugin(mongooseDelete, {
  deleteAt: true,
  overrideMethods: "all",
});

export default model("Users", Users);
