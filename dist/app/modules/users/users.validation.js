"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const users_constant_1 = require("./users.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is Required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is Required",
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is Required",
        }),
        address: zod_1.z.string({
            required_error: "Address is Required",
        }),
        role: zod_1.z.enum([...users_constant_1.userRole], {
            required_error: "Role is Required",
        }),
        password: zod_1.z.string({
            required_error: "Password is Required",
        }),
        budget: zod_1.z.number({
            required_error: "Budget is Required",
        }),
        income: zod_1.z.number({
            required_error: "Income is Required",
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        role: zod_1.z.enum([...users_constant_1.userRole]).optional(),
        password: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    })
        .optional(),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
