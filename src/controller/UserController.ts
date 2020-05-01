import { RequestHandler } from "express";

import userService from "../service/UserService";
import UserUtils from "../model/UserUtils";
import Result from "../model/Result";

const findAll: RequestHandler = (req, res, next) => {
  console.debug("invoked findAll()");
  const users = userService.findAll().map((user) => UserUtils.fromUser(user));
  return res.status(200).json(Result.fromData(users));
};

const findOne: RequestHandler<{ id: string }> = (req, res, next) => {
  console.debug("invoked findOne()");
  const id = req.params.id;
  const user = userService.findOne(parseInt(id));
  const userContent = UserUtils.fromUser(user);
  return res.status(200).json(Result.fromData(userContent));
};

const create: RequestHandler = (req, res, next) => {
  console.debug("invoked create()");
  const createdUser = userService.create(req.body);
  const userContent = UserUtils.fromUser(createdUser);
  return res.status(201).json(Result.fromData(userContent));
};

const update: RequestHandler<{ id: string }> = (req, res, next) => {
  console.debug("invoked update()");
  const id = parseInt(req.params.id);
  const updatedUser = userService.update(id, req.body);
  const userContent = UserUtils.fromUser(updatedUser);
  return res.status(200).json(Result.fromData(userContent));
};

const remove: RequestHandler<{ id: string }> = (req, res, next) => {
  console.debug("invoked remove()");
  const id = req.params.id;
  const user = userService.remove(parseInt(id));
  return res.status(200).json(Result.fromData(`User id = ${id} removed.`));
};

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
};
