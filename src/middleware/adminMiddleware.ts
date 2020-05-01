import { RequestHandler } from "express";
import Result from "../model/Result";
import UserService from "../service/UserService";

const adminMiddleware: RequestHandler = (req, res, next) => {
  console.debug("invoked adminMiddleware()");
  if (process.env.MYAPP_DISABLE_CHECK_AUTH === "true") {
    return next();
  }
  const userId = parseInt(res.get("userId"));
  console.log("userId :>> ", userId);
  const user = UserService.findOne(userId);
  if (user.role !== "ADMIN") {
    return res.status(403).json(Result.fromError("ADMIN privileges required."));
  }
  next();
};

export default adminMiddleware;
