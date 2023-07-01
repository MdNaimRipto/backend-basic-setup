import { z } from "zod";
import { breedOfCow, locationOfCow } from "./cows.constant";
import { CowPurpose } from "./cows.enum";

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Cow Name is Required",
    }),
    age: z.number({
      required_error: "Cow Age is Required",
    }),
    price: z.number({
      required_error: "Cow Price is Required",
    }),
    location: z.enum([...locationOfCow] as [string, ...string[]], {
      required_error: "Cow Location is Required",
    }),
    breed: z.enum([...breedOfCow] as [string, ...string[]], {
      required_error: "Cow Breed is Required",
    }),
    category: z.nativeEnum(CowPurpose, {
      required_error: "Cow Category is Required",
    }),
    seller: z.string({
      required_error: "Seller ID Required",
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      age: z.number().optional(),
      price: z.number().optional(),
      location: z.enum([...locationOfCow] as [string, ...string[]]).optional(),
      breed: z.enum([...breedOfCow] as [string, ...string[]]).optional(),
      category: z.nativeEnum(CowPurpose).optional(),
      seller: z.string().optional(),
    })
    .optional(),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
