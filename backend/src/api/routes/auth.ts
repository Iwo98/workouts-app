import { Router } from "express";
import * as controllers from "../contollers/auth";

const router: Router = Router();

router.post("/login", controllers.logIn);

router.post("/register", controllers.register);

export default router;
