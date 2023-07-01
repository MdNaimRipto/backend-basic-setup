"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_router_1 = require("../app/modules/users/users.router");
const cows_router_1 = require("../app/modules/cows/cows.router");
const order_router_1 = require("../app/modules/orders/order.router");
const router = express_1.default.Router();
const routes = [
    {
        path: "/auth",
        route: users_router_1.userSignup,
    },
    {
        path: "/users",
        route: users_router_1.userRouter,
    },
    {
        path: "/cows",
        route: cows_router_1.cowRouter,
    },
    {
        path: "/orders",
        route: order_router_1.OrderRouter,
    },
];
routes.map(r => router.use(r.path, r.route));
exports.default = router;
