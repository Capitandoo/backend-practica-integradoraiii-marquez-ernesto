import { Router } from "express";
import {
  getAllController,
  getByIdController,
  createController,
  updateController,
  deleteController,
} from "../controllers/messages.controllers.js";
import { passportCall, authorizationRole } from "../middlewares/sessions.js";

const router = Router();

router.get("/messages", getAllController);
router.post("/createmsg", passportCall("jwt"), authorizationRole(["user"]), createController);
router.get('/', (req, res) => {
  res.render('chat');
});

export default router;
