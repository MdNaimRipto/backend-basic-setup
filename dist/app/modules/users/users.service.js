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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const users_schema_1 = require("./users.schema");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.budget && user.role === "seller") {
        user.budget = 0;
    }
    if (!user.budget) {
        user.budget = 0;
    }
    user.income = 0;
    const createUser = yield users_schema_1.Users.create(user);
    if (!createUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to Create User! Please Try Again.");
    }
    else {
        return createUser;
    }
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_schema_1.Users.find();
    if (result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "0 User Data Not Found!");
    }
    return result;
});
const getUserByID = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_schema_1.Users.findById({ _id: payload });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Data Not Found");
    }
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield users_schema_1.Users.findById({ _id: id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found!");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).map(key => {
            const nameKey = `name.${key}`;
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = yield users_schema_1.Users.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
});
const deleteUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield users_schema_1.Users.findById({ _id: payload });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found!");
    }
    const result = yield users_schema_1.Users.findOneAndDelete({ _id: payload });
    return result;
});
exports.UserService = {
    createUser,
    getAllUser,
    getUserByID,
    updateUser,
    deleteUser,
};
