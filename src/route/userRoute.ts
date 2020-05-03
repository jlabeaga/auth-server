import { Router } from "express";
import UserController from "../controller/UserController";

const router = Router();

router.post("/", UserController.create);

router.get("/:id", UserController.findOne);

router.get("/", UserController.findAll);

router.patch("/:id", UserController.update);

router.delete("/:id", UserController.remove);

export default router;
