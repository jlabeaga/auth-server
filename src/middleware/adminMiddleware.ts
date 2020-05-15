import { RequestHandler } from "express";
import Result from "../model/Result";
import UserService from "../service/UserService";
import TicketError from "../model/TicketError";

const adminMiddleware: RequestHandler = async (req, res, next) => {
  console.debug("invoked adminMiddleware()");
  if (process.env.MYAPP_DISABLE_CHECK_AUTH === "true") {
    return next();
  }
  if (req.method === "OPTIONS") {
    console.log("method OPTIONS requested");
    return next();
  }
  try {
    const userId = parseInt(res.get("userId"));
    console.log("userId :>> ", userId);
    const user = await UserService.findOne(userId);
    if (!user) {
      return res
        .status(403)
        .json(Result.fromErrorMessage("Admin user is not found."));
    }
    if (user.role !== "ADMIN") {
      return res
        .status(403)
        .json(Result.fromErrorMessage("ADMIN privileges required."));
    }
  } catch (error) {
    return res.status(403).json(Result.fromError(error));
  }
  next();
};

export default adminMiddleware;
