import { Router } from "express";
import userModel from "../models/userModel";

import client from "../config/redis";
const router = Router();

router.get("/allusers", async (req, res) => {
  let result = await userModel.find();
  res.json(result);
});

router.get("/delusers", async (req, res) => {
  let result = await userModel.deleteMany();
  res.json(result);
});

router.get("/redis/set", async (req, res) => {
  await client.set("demo", "demo");
});
router.get("/redis/get", async (req, res) => {
  let a = await client.get("6348ead86d2c5e4ea8947d0a");
  res.json({ a });
});
export default router;
