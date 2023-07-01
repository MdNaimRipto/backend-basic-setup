import express from "express";
import { UserController } from "./users.controller";
import { UserValidation } from "./users.validation";
import validateRequest from "../../../middleware/validateRequest";

const router = express.Router();

export const userSignup = router.post(
  "/signup",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get("/:id", UserController.getUserByID);

router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.delete("/deleteUser/:id", UserController.deleteUser);

router.get("/", UserController.getAllUser);

export const userRouter = router;
