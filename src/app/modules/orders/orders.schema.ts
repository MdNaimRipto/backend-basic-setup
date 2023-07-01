import { Schema, model } from "mongoose";
import { IOrders, OrderModel } from "./orders.interface";

const orderSchema = new Schema<IOrders, OrderModel>({
  cow: {
    type: Schema.Types.ObjectId,
    ref: "Cows",
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export const Orders = model<IOrders, OrderModel>("Orders", orderSchema);
