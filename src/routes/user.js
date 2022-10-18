import { Router } from "express";
import userController from "../controllers/userController";
import { VerifyToken } from "../middlewares";

const router = Router();

router.post("/login", userController.logIn);

router.post("/signup", userController.signUP);

router.get("/logout", VerifyToken, userController.logOut);

router.get("/refresh-token", userController.refreshToken);

export default router;
