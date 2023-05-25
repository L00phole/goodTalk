import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const errorHandler = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    const field = Object.keys(err.keyValue)[0];
    const fieldValue = err.keyValue[field];
    defaultError.msg = `${field} "${fieldValue}" already exists`;
  }
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};
export default errorHandler;
