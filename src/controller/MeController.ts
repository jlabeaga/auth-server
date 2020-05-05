import { RequestHandler } from "express";

import userService from "../service/UserService";
import UserUtils from "../model/UserUtils";
import Result from "../model/Result";
import TicketErrorUtils from "../model/TicketErrorUtils";

// const findAll: RequestHandler = async (req, res, next) => {
//   console.debug("invoked findAll()");
//   try {
//     const users = (await userService.findAll()).map((user) =>
//       UserUtils.fromUser(user)
//     );
//     return res.status(200).json(Result.fromData(users));
//   } catch (error) {
//     const ticketError = TicketErrorUtils.createTicketAndLog(
//       error,
//       "Error when listing users at UserController"
//     );
//     return next(ticketError);
//   }
// };

const find: RequestHandler = async (req, res, next) => {
  console.debug("invoked find()");
  try {
    const userId = parseInt(res.get("userId"));
    console.log("userId :>> ", userId);
    const user = await userService.findOne(userId);
    const userContent = UserUtils.fromUser(user);
    return res.status(200).json(Result.fromData(userContent));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when finding user at MeController"
    );
    return next(ticketError);
  }
};

const update: RequestHandler = async (req, res, next) => {
  console.debug("invoked update()");
  try {
    const userId = parseInt(res.get("userId"));
    console.log("userId :>> ", userId);
    const updatedUser = await userService.update(userId, req.body);
    const userContent = UserUtils.fromUser(updatedUser);
    return res.status(200).json(Result.fromData(userContent));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when updating user at MeController"
    );
    return next(ticketError);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  console.debug("invoked remove()");
  try {
    const userId = parseInt(res.get("userId"));
    console.log("userId :>> ", userId);
    const user = await userService.remove(userId);
    return res
      .status(200)
      .json(Result.fromData(`User id = ${userId} removed.`));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when deleting user at MeController"
    );
    return next(ticketError);
  }
};

export default {
  find,
  update,
  remove,
};
