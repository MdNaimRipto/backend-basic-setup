import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICowFilters, ICows } from "./cows.interface";
import { Cows } from "./cows.schema";
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { cowSearchableFields } from "./cows.constant";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";

const createCowData = async (cow: ICows): Promise<ICows | null> => {
  cow.label = "for sale";
  const createCowData = (await Cows.create(cow)).populate("seller");
  if (!createCowData) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Failed to Create Cow Data! Please Try Again."
    );
  } else {
    return createCowData;
  }
};

const getAllCow = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<ICows[]>> => {
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  //
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  //
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //
  const checkAndCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Cows.find(checkAndCondition)
    .populate("seller")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cows.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getCowByID = async (payload: string): Promise<ICows | null> => {
  const result = await Cows.findById({ _id: payload }).populate("seller");
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow Data Not Found");
  }
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICows>
): Promise<ICows | null> => {
  const isExists = await Cows.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow Not Found!");
  }

  const result = await Cows.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("seller");
  return result;
};

const deleteCow = async (payload: string): Promise<ICows | null> => {
  const isExists = await Cows.findById({ _id: payload });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow Not Found!");
  }

  const result = await Cows.findOneAndDelete({ _id: payload });
  return result;
};

export const CowService = {
  createCowData,
  getAllCow,
  getCowByID,
  updateCow,
  deleteCow,
};
