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

router.get("/allkeys", async (req, res) => {
  try {
    let resu = await client.keys("*");

    res.send(resu);
  } catch (error) {
    res.send(error);
  }
});

router.get("/allkeys/:key", async (req, res) => {
  let key = req.params.key;
  await client.del(key);
});
export default router;
