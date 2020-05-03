import { RequestHandler } from "express";
import EncryptService from "../service/EncryptService";
import UserContent from "../model/UserContent";
import Result from "../model/Result";
import UserService from "../service/UserService";
import TicketError from "../model/TicketError";

const authMiddleware: RequestHandler = async (req, res, next) => {
  console.debug("invoked authMiddleware()");
  try {
    if (process.env.MYAPP_DISABLE_CHECK_AUTH === "true") {
      return next();
    }
    const header = req.headers.authorization as string;
    const token = header.split(" ")[1];
    if (!token) {
      throw new Error(`Wrong token received = ${token}`);
    }
    const userContent = EncryptService.verifyJwtToken(token) as UserContent;
    console.log("userContent :>> ", userContent);
    const user = await UserService.findOne(userContent.id);
    if (!user.enabled) {
      throw new Error(`User is disabled`);
    }
    res.set("userId", "" + userContent.id);
    return next();
  } catch (err) {
    const ticketError = TicketError.fromErrorMessage(
      "Authentication failed. " + err.message
    );
    console.log(ticketError);
    ticketError.stack = "";
    return res.status(403).json(Result.fromError(ticketError));
  }
};

export default authMiddleware;
