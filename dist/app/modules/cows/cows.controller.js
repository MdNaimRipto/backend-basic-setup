"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cows_service_1 = require("./cows.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const cows_constant_1 = require("./cows.constant");
const pagination_constant_1 = require("../../../constant/pagination.constant");
const createCowData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowData = req.body;
    const result = yield cows_service_1.CowService.createCowData(cowData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cow Created Successfully",
        data: result,
    });
}));
const getAllCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cows_constant_1.cowFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_constant_1.paginationFields);
    const result = yield cows_service_1.CowService.getAllCow(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cow's Retrieved Successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getCowByID = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cows_service_1.CowService.getCowByID(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cow Retrieved Successfully",
        data: result,
    });
}));
const updateCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const CowData = req.body;
    const result = yield cows_service_1.CowService.updateCow(id, CowData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cow Updated Successfully",
        data: result,
    });
}));
const deleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cows_service_1.CowService.deleteCow(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cow Deleted Successfully",
        data: result,
    });
}));
exports.CowController = {
    createCowData,
    getAllCow,
    getCowByID,
    updateCow,
    deleteCow,
};
