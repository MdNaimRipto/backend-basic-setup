import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./orders.service";
import { IOrders } from "./orders.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData.cow, orderData.buyer);
  sendResponse<IOrders | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order Created Successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();
  sendResponse<IOrders[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order's Retrieved Successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
