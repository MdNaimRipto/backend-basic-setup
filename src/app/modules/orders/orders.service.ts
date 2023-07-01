/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICows } from "../cows/cows.interface";
import { IUsers } from "../users/users.interface";
import { IOrders } from "./orders.interface";
import mongoose from "mongoose";
import { Users } from "../users/users.schema";
import { Orders } from "./orders.schema";
import { Cows } from "../cows/cows.schema";

const createOrder = async (
  cowId: string,
  buyerId: string
): Promise<IOrders | null> => {
  const buyer = (await Users.findOne({ _id: buyerId })) as IUsers;
  const cow = (await Cows.findOne({ _id: cowId })) as ICows;
  if (buyer.budget < cow.price) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Not Enough Money. Please Add More Money!"
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    let newAllOrderData = null;

    await Cows.findOneAndUpdate(
      { _id: cowId },
      { label: "sold out" },
      { session }
    );

    await Users.findOneAndUpdate(
      { _id: buyerId },
      { $inc: { budget: -cow.price } },
      { session }
    );

    await Users.findOneAndUpdate(
      { _id: cow.seller },
      { $inc: { income: +cow.price } },
      { session }
    );

    const newOrder = await Orders.create([{ buyer: buyerId, cow: cowId }], {
      session,
    });
    if (!newOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to Create User");
    }
    newAllOrderData = newOrder[0];
    await session.commitTransaction();
    await session.endSession();
    //
    if (newAllOrderData) {
      newAllOrderData = await Orders.findOne({
        _id: newAllOrderData.id,
      })
        .populate({
          path: "cow",
          populate: [
            {
              path: "seller",
            },
          ],
        })
        .populate("buyer");
    }
    return newAllOrderData;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(400, error.message);
  }
};

const getAllOrders = async (): Promise<IOrders[]> => {
  const result = await Orders.find()
    .populate({
      path: "cow",
      populate: [
        {
          path: "seller",
        },
      ],
    })
    .populate("buyer");

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
