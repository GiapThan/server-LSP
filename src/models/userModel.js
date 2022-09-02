import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

const Users = new Schema(
  {
    name: { type: String },
    description: { type: String },
    link: { type: String },
    nameimg: { type: String },
  },
  { timestamps: true }
);

Users.plugin(mongooseDelete, {
  deleteAt: true,
  overrideMethods: "all",
});

export default model("Users", Users);
