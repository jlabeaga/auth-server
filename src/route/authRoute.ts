import { Router } from "express";
import LoginController from "../controller/LoginController";

const router = Router();

router.post("/login", LoginController.login);

router.post("/logout");

router.get("/profile");

router.get("/verify/:jwtToken", LoginController.verify);

router.post("/sign", LoginController.sign);

router.patch("/");

export default router;
