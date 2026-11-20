import { Router } from "express";
import auth from "../middleware/auth.js";
import validateId from "../middleware/validateId.js";
import * as controller from "../controllers/hackathons.controller.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", validateId, controller.getOne);
router.get("/:id/seekers", validateId, controller.getSeekers);
router.post("/:id/interest", auth, validateId, controller.addInterest);
router.delete("/:id/interest", auth, validateId, controller.removeInterest);

export default router;