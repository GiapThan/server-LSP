import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.post("/login", userController.logIn);

router.post("/signup", userController.signUP);

router.get("/logout", userController.logOut);

export default router;
