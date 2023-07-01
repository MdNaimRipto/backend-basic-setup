"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRouter = void 0;
const express_1 = __importDefault(require("express"));
const cows_controller_1 = require("./cows.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const cows_validation_1 = require("./cows.validation");
const router = express_1.default.Router();
router.get("/:id", cows_controller_1.CowController.getCowByID);
router.patch("/:id", (0, validateRequest_1.default)(cows_validation_1.CowValidation.updateCowZodSchema), cows_controller_1.CowController.updateCow);
router.delete("/:id", cows_controller_1.CowController.deleteCow);
router.post("/", (0, validateRequest_1.default)(cows_validation_1.CowValidation.createCowZodSchema), cows_controller_1.CowController.createCowData);
router.get("/", cows_controller_1.CowController.getAllCow);
exports.cowRouter = router;
