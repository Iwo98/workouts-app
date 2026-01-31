import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import * as controllers from "../contollers/sets";

const router = Router();

// All sets operations
router.get("/:id", authenticateToken, controllers.getAllSetsFromWorkout);

router.post("/", authenticateToken, controllers.createSet);

router.patch("/:id", authenticateToken, controllers.updateSet);

router.delete("/:id", authenticateToken, controllers.deleteSet);

export default router;
