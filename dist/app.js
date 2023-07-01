"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./routes/routes"));
const pathNotFoundErrorHandler_1 = __importDefault(require("./middleware/pathNotFoundErrorHandler"));
// Configuring app
const app = (0, express_1.default)();
// middleWire
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.status(201).send({
        message: "Digital Cow Hat Server is running successfully.",
        statusCode: 201,
    });
});
app.use("/api/v1", routes_1.default);
// Global Error Handler
app.use(globalErrorHandler_1.default);
// Path Not Found Error
app.use(pathNotFoundErrorHandler_1.default);
exports.default = app;
