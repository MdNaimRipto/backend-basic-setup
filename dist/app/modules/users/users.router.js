"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.userSignup = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const users_validation_1 = require("./users.validation");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const router = express_1.default.Router();
exports.userSignup = router.post("/signup", (0, validateRequest_1.default)(users_validation_1.UserValidation.createUserZodSchema), users_controller_1.UserController.createUser);
router.get("/:id", users_controller_1.UserController.getUserByID);
router.patch("/:id", (0, validateRequest_1.default)(users_validation_1.UserValidation.updateUserZodSchema), users_controller_1.UserController.updateUser);
router.delete("/deleteUser/:id", users_controller_1.UserController.deleteUser);
router.get("/", users_controller_1.UserController.getAllUser);
exports.userRouter = router;
