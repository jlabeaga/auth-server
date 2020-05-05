import { Router } from "express";
import UserController from "../controller/UserController";
import MeController from "../controller/MeController";

const router = Router();

router.get("/", MeController.find);

router.patch("/", MeController.update);

router.delete("/", MeController.remove);

export default router;
