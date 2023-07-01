import { z } from "zod";
import { userRole } from "./users.constant";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First Name is Required",
      }),
      lastName: z.string({
        required_error: "Last Name is Required",
      }),
    }),
    phoneNumber: z.string({
      required_error: "Phone Number is Required",
    }),
    address: z.string({
      required_error: "Address is Required",
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: "Role is Required",
    }),
    password: z.string({
      required_error: "Password is Required",
    }),
    budget: z.number({
      required_error: "Budget is Required",
    }),
    income: z.number({
      required_error: "Income is Required",
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z
    .object({
      name: z
        .object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      phoneNumber: z.string().optional(),
      address: z.string().optional(),
      role: z.enum([...userRole] as [string, ...string[]]).optional(),
      password: z.string().optional(),
      budget: z.number().optional(),
      income: z.number().optional(),
    })
    .optional(),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
