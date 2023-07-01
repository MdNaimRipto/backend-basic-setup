"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const users_constant_1 = require("./users.constant");
const userSchema = new mongoose_1.Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    role: { type: String, required: true, enum: users_constant_1.userRole },
    password: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Users = (0, mongoose_1.model)("Users", userSchema);
