import { Router } from "express";
import UserController from "../controller/UserController";

const router = Router();

router.post("/", UserController.create);

router.get("/", UserController.findAll);

router.get("/:id", UserController.findOne);

router.patch("/:id", UserController.update);

router.delete("/:id", UserController.remove);

export default router;
