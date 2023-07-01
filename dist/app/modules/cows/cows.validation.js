"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cows_constant_1 = require("./cows.constant");
const cows_enum_1 = require("./cows.enum");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Cow Name is Required",
        }),
        age: zod_1.z.number({
            required_error: "Cow Age is Required",
        }),
        price: zod_1.z.number({
            required_error: "Cow Price is Required",
        }),
        location: zod_1.z.enum([...cows_constant_1.locationOfCow], {
            required_error: "Cow Location is Required",
        }),
        breed: zod_1.z.enum([...cows_constant_1.breedOfCow], {
            required_error: "Cow Breed is Required",
        }),
        category: zod_1.z.nativeEnum(cows_enum_1.CowPurpose, {
            required_error: "Cow Category is Required",
        }),
        seller: zod_1.z.string({
            required_error: "Seller ID Required",
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cows_constant_1.locationOfCow]).optional(),
        breed: zod_1.z.enum([...cows_constant_1.breedOfCow]).optional(),
        category: zod_1.z.nativeEnum(cows_enum_1.CowPurpose).optional(),
        seller: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
