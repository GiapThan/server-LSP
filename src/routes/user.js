import { Router } from "express";
import Users from "../models/userModel";

const router = Router();

router.get("/", async (req, res) => {
  let respone = await Users.create({
    name: "dang",
  });
  res.json(respone);
});

export default router;
