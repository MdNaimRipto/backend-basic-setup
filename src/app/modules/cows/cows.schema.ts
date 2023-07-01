import { Schema, model } from "mongoose";
import { CowModel, ICows } from "./cows.interface";
import { breedOfCow, cowLabel, locationOfCow } from "./cows.constant";
import { CowPurpose } from "./cows.enum";

const cowSchema = new Schema<ICows, CowModel>(
  {
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
      enum: locationOfCow,
    },
    breed: {
      type: String,
      required: true,
      enum: breedOfCow,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: cowLabel,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(CowPurpose),
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cows = model<ICows, CowModel>("Cows", cowSchema);
