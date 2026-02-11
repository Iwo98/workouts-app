import { Router } from "express";
import * as controllers from "../contollers/auth";
import { authenticateToken } from "../middleware/authenticateToken";

const router: Router = Router();

router.post("/login", controllers.logIn);

router.post("/register", controllers.register);

router.get("/me", authenticateToken, controllers.getMe);

export default router;
