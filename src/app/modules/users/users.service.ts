/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUsers } from "./users.interface";
import { Users } from "./users.schema";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createUser = async (user: IUsers): Promise<IUsers | null> => {
  if (user.budget && user.role === "seller") {
    user.budget = 0;
  }
  if (!user.budget) {
    user.budget = 0;
  }
  user.income = 0;

  const createUser = await Users.create(user);
  if (!createUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to Create User! Please Try Again."
    );
  } else {
    return createUser;
  }
};

const getAllUser = async (): Promise<IUsers[]> => {
  const result = await Users.find();
  if (result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 User Data Not Found!");
  }
  return result;
};

const getUserByID = async (payload: string): Promise<IUsers | null> => {
  const result = await Users.findById({ _id: payload });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Data Not Found");
  }
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUsers>
): Promise<IUsers | null> => {
  const isExists = await Users.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  const { name, ...userData } = payload;
  const updatedUserData: Partial<IUsers> = { ...userData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).map(key => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Users.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteUser = async (payload: string): Promise<IUsers | null> => {
  const isExists = await Users.findById({ _id: payload });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  const result = await Users.findOneAndDelete({ _id: payload });
  return result;
};

export const UserService = {
  createUser,
  getAllUser,
  getUserByID,
  updateUser,
  deleteUser,
};
