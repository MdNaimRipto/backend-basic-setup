import express from "express";
import { userRouter, userSignup } from "../app/modules/users/users.router";
import { cowRouter } from "../app/modules/cows/cows.router";
import { OrderRouter } from "../app/modules/orders/order.router";

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: userSignup,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/cows",
    route: cowRouter,
  },
  {
    path: "/orders",
    route: OrderRouter,
  },
];

routes.map(r => router.use(r.path, r.route));

export default router;
