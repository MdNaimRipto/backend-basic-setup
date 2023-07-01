import { Model, Types } from "mongoose";
import { ICows } from "../cows/cows.interface";
import { IUsers } from "../users/users.interface";

export type IOrders = {
  cow: Types.ObjectId | ICows;
  buyer: Types.ObjectId | IUsers;
};

export type OrderModel = Model<IOrders, object>;
