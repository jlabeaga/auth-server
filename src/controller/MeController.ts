import { RequestHandler } from "express";

import userService from "../service/UserService";
import UserUtils from "../model/UserUtils";
import Result from "../model/Result";
import TicketErrorUtils from "../model/TicketErrorUtils";

const find: RequestHandler = async (req, res, next) => {
  console.debug("invoked Me.find()");
  try {
    const userId = parseInt(res.get("userId"));
    console.log("userId :>> ", userId);
    const user = await userService.findOne(userId);
    if (!user) {
      return res.status(404).json(Result.fromData("User not found."));
    }
    const userContent = UserUtils.fromUser(user);
    return res
      .status(200)
      .json(Result.fromData(userContent, `User id = ${userId} found.`));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when finding user at MeController"
    );
    return next(ticketError);
  }
};

const update: RequestHandler = async (req, res, next) => {
  console.debug("invoked Me.update()");
  try {
    const userId = parseInt(res.get("userId"));
    console.log("userId :>> ", userId);
    const { username, password, email } = req.body;
    let input = {};
    if (username) {
      input = { ...input, username };
    }
    if (password) {
      input = { ...input, password };
    }
    if (email) {
      input = { ...input, email };
    }
    const updatedUser = await userService.update(userId, input);
    if (!updatedUser) {
      return res.status(404).json(Result.fromData("User not found."));
    }
    const userContent = UserUtils.fromUser(updatedUser);
    return res
      .status(200)
      .json(Result.fromData(userContent, `User id = ${userId} updated.`));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when updating user at MeController"
    );
    return next(ticketError);
  }
};

const disable: RequestHandler = async (req, res, next) => {
  console.debug("invoked Me.disable()");
  try {
    const userId = parseInt(res.get("userId"));
    console.log("userId :>> ", userId);
    const user = await userService.disable(userId);
    return res
      .status(200)
      .json(Result.fromData(user, `User id = ${userId} disabled.`));
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
  disable,
};
