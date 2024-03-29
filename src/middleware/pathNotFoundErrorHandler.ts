import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const pathNotFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: `Cannot get Path:'${req.url}'`,
    errorMessages: [
      {
        path: `${req.url}`,
        message: `Cannot get Path:'${req.url}'`,
      },
    ],
  });
  next();
};

export default pathNotFoundErrorHandler;
