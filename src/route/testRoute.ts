import { Router } from "express";
import TestController from "../controller/TestController";

const router = Router();

router.post("/initDb", TestController.initDb);

router.get("/test", TestController.test);

export default router;
