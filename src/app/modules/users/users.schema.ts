import { Schema, model } from "mongoose";
import { IUsers, UserModel } from "./users.interface";
import { userRole } from "./users.constant";

const userSchema = new Schema<IUsers>(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    role: { type: String, required: true, enum: userRole },
    password: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Users = model<IUsers, UserModel>("Users", userSchema);
