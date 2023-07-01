"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cows = void 0;
const mongoose_1 = require("mongoose");
const cows_constant_1 = require("./cows.constant");
const cows_enum_1 = require("./cows.enum");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cows_constant_1.locationOfCow,
    },
    breed: {
        type: String,
        required: true,
        enum: cows_constant_1.breedOfCow,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: cows_constant_1.cowLabel,
    },
    category: {
        type: String,
        required: true,
        enum: Object.values(cows_enum_1.CowPurpose),
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cows = (0, mongoose_1.model)("Cows", cowSchema);
