import { RequestHandler } from "express";

import userService from "../service/UserService";
import UserUtils from "../model/UserUtils";
import Result from "../model/Result";
import TicketErrorUtils from "../model/TicketErrorUtils";

const findAll: RequestHandler = async (req, res, next) => {
  console.debug("invoked findAll()");
  try {
    const users = (await userService.findAll()).map((user) =>
      UserUtils.fromUser(user)
    );
    return res
      .status(200)
      .json(Result.fromData(users, "Users successfully listed."));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when listing users at UserController"
    );
    return next(ticketError);
  }
};

const findOne: RequestHandler<{ id: string }> = async (req, res, next) => {
  console.debug("invoked findOne()");
  try {
    const id = req.params.id;
    const user = await userService.findOne(parseInt(id));
    const userContent = UserUtils.fromUser(user);
    return res
      .status(200)
      .json(Result.fromData(userContent, `User id = ${id} found.`));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when finding user at UserController"
    );
    return next(ticketError);
  }
};

const create: RequestHandler = async (req, res, next) => {
  console.debug("invoked create()");
  try {
    const createdUser = await userService.create(req.body);
    const userContent = UserUtils.fromUser(createdUser);
    return res
      .status(201)
      .json(
        Result.fromData(
          userContent,
          `User id = ${userContent.id} successfully created.`
        )
      );
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when creating user at UserController"
    );
    return next(ticketError);
  }
};

const update: RequestHandler<{ id: string }> = async (req, res, next) => {
  console.debug("invoked update()");
  try {
    const id = parseInt(req.params.id);
    const updatedUser = await userService.update(id, req.body);
    const userContent = UserUtils.fromUser(updatedUser);
    return res
      .status(200)
      .json(
        Result.fromData(userContent, `User id = ${id} successfully updated.`)
      );
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when updating user at UserController"
    );
    return next(ticketError);
  }
};

const remove: RequestHandler<{ id: string }> = async (req, res, next) => {
  console.debug("invoked remove()");
  try {
    const id = req.params.id;
    const user = await userService.remove(parseInt(id));
    return res
      .status(200)
      .json(Result.fromData(null, `User id = ${id} succesfully removed.`));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when deleting user at UserController"
    );
    return next(ticketError);
  }
};

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
};
