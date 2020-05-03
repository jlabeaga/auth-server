import { RequestHandler } from "express";
import Result from "../model/Result";
import UserService from "../service/UserService";
import TicketError from "../model/TicketError";

const adminMiddleware: RequestHandler = async (req, res, next) => {
  console.debug("invoked adminMiddleware()");
  if (process.env.MYAPP_DISABLE_CHECK_AUTH === "true") {
    return next();
  }
  const userId = parseInt(res.get("userId"));
  console.log("userId :>> ", userId);
  const user = await UserService.findOne(userId);
  if (user.role !== "ADMIN") {
    const ticketError = TicketError.fromErrorMessage(
      "ADMIN privileges required."
    );
    console.log(ticketError);
    ticketError.stack = "";
    return res.status(403).json(Result.fromError(ticketError));
  }
  next();
};

export default adminMiddleware;
