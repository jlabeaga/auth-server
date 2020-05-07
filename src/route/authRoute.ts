import { Router } from "express";
import LoginController from "../controller/LoginController";

const router = Router();

router.post("/register", LoginController.register);

router.post("/login", LoginController.login);

router.post("/logout/:jwtToken", LoginController.logout);

router.get("/isRevoked/:jwtToken", LoginController.isRevoked);

router.post("/purgeOldTokens", LoginController.purgeOldTokens);

router.get("/verify/:jwtToken", LoginController.verify);

router.post("/sign", LoginController.sign);

router.patch("/");

export default router;
