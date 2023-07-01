import { Model } from "mongoose";

type UserName = {
  firstName: string;
  lastName: string;
};

export type UserRole = "seller" | "buyer";

export type IUsers = {
  name: UserName;
  phoneNumber: string;
  address: string;
  role: UserRole;
  password: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUsers, object>;
