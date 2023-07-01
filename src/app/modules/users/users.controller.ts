import { Request, Response } from "express";
import { UserService } from "./users.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IUsers } from "./users.interface";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UserService.createUser(userData);
  sendResponse<IUsers | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Created Successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUser();
  sendResponse<IUsers[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User's Retrieved Successfully",
    data: result,
  });
});

const getUserByID = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getUserByID(id);
  sendResponse<IUsers | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Retrieved Successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userData = req.body;
  const result = await UserService.updateUser(id, userData);
  sendResponse<IUsers | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User's Updated Successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendResponse<IUsers | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Deleted Successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
  getUserByID,
  updateUser,
  deleteUser,
};
