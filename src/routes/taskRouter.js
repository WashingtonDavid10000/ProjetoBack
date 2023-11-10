import { Router } from "express";
import * as taskController from "../controllers/taskController";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.get("/", loginRequired, taskController.get);
router.post("/", loginRequired, taskController.store);
router.put("/", loginRequired, taskController.update);
router.delete("/", loginRequired, taskController.remove);

export default router;
