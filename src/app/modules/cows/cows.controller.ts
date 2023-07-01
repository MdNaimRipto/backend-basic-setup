import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CowService } from "./cows.service";
import { ICows } from "./cows.interface";
import pick from "../../../shared/pick";
import { cowFilterableFields } from "./cows.constant";
import { paginationFields } from "../../../constant/pagination.constant";

const createCowData = catchAsync(async (req: Request, res: Response) => {
  const cowData = req.body;
  const result = await CowService.createCowData(cowData);
  sendResponse<ICows | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cow Created Successfully",
    data: result,
  });
});

const getAllCow = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCow(filters, paginationOptions);
  sendResponse<ICows[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cow's Retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getCowByID = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.getCowByID(id);
  sendResponse<ICows | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cow Retrieved Successfully",
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const CowData = req.body;
  const result = await CowService.updateCow(id, CowData);
  sendResponse<ICows | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cow Updated Successfully",
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);
  sendResponse<ICows | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cow Deleted Successfully",
    data: result,
  });
});

export const CowController = {
  createCowData,
  getAllCow,
  getCowByID,
  updateCow,
  deleteCow,
};
