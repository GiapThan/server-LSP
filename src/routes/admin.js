import { Router } from "express";
import userModel from "../models/userModel";

const router = Router();

router.get("/allusers", async (req, res) => {
  let result = await userModel.find();
  res.json(result);
});

router.get("/delusers", async (req, res) => {
  let result = await userModel.deleteMany();
  res.json(result);
});

export default router;
