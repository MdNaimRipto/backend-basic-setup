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
exports.OrderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_schema_1 = require("../users/users.schema");
const orders_schema_1 = require("./orders.schema");
const cows_schema_1 = require("../cows/cows.schema");
const createOrder = (cowId, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = (yield users_schema_1.Users.findOne({ _id: buyerId }));
    const cow = (yield cows_schema_1.Cows.findOne({ _id: cowId }));
    if (buyer.budget < cow.price) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Not Enough Money. Please Add More Money!");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        let newAllOrderData = null;
        yield cows_schema_1.Cows.findOneAndUpdate({ _id: cowId }, { label: "sold out" }, { session });
        yield users_schema_1.Users.findOneAndUpdate({ _id: buyerId }, { $inc: { budget: -cow.price } }, { session });
        yield users_schema_1.Users.findOneAndUpdate({ _id: cow.seller }, { $inc: { income: +cow.price } }, { session });
        const newOrder = yield orders_schema_1.Orders.create([{ buyer: buyerId, cow: cowId }], {
            session,
        });
        if (!newOrder.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to Create User");
        }
        newAllOrderData = newOrder[0];
        yield session.commitTransaction();
        yield session.endSession();
        //
        if (newAllOrderData) {
            newAllOrderData = yield orders_schema_1.Orders.findOne({
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
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new ApiError_1.default(400, error.message);
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_schema_1.Orders.find()
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
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
