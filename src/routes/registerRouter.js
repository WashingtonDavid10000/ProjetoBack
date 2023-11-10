import { Router } from "express";
import registerController from "../controllers/resgisterController";

const router = Router();

router.post("/", registerController);

export default router;
