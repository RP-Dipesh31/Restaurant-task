import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validatorMyUserRequest } from "../middleware/validation";

const router = express.Router();

//   /api/my/user
router.get("/", jwtCheck,jwtParse, MyUserController.getCurrentUser);
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validatorMyUserRequest, MyUserController.updateCurrentUser);

export default router;
