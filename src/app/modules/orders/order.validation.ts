import { z } from "zod";

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: "Cow ID is Required",
    }),
    buyer: z.string({
      required_error: "Buyer ID is Required",
    }),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
