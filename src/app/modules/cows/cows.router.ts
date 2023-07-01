import express from "express";
import { CowController } from "./cows.controller";
import validateRequest from "../../../middleware/validateRequest";
import { CowValidation } from "./cows.validation";

const router = express.Router();

router.get("/:id", CowController.getCowByID);

router.patch(
  "/:id",
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.delete("/:id", CowController.deleteCow);

router.post(
  "/",
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCowData
);

router.get("/", CowController.getAllCow);

export const cowRouter = router;
