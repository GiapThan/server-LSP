import { Router } from "express";
import Users from "../models/userModel";
import userController from "../controllers/userController";

const router = Router();

router.post("/login", userController.logIn);

router.post("/signup", userController.signUP);

router.get("/", async (req, res) => {});

export default router;
