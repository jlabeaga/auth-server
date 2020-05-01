import { RequestHandler } from "express";
import EncryptService from "../service/EncryptService";
import UserContent from "../model/UserContent";
import Result from "../model/Result";
import UserService from "../service/UserService";

const authMiddleware: RequestHandler = (req, res, next) => {
  console.debug("invoked authMiddleware()");
  try {
    const header = req.headers.authorization as string;
    const token = header.split(" ")[1];
    if (!token) {
      throw new Error(`Wrong token received = ${token}`);
    }
    const userContent = EncryptService.verifyJwtToken(token) as UserContent;
    console.log("userContent :>> ", userContent);
    const user = UserService.findOne(userContent.id);
    if (!user.enabled) {
      throw new Error(`User is disabled`);
    }
    res.set("userId", "" + userContent.id);
    return next();
  } catch (err) {
    return res
      .status(403)
      .json(Result.fromError("Authentication failed. " + err.message));
  }
};

export default authMiddleware;
