import express from "express";

const router = express.Router();

const routes = [
  {
    path: "",
    route: ,
  },
];

routes.map(r => router.use(r.path, r.route));

export default router;
