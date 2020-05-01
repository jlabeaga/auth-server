import { RequestHandler } from "express";

import userService from "../service/UserService";
import Result from "../model/Result";

const login: RequestHandler = (req, res, next) => {
  console.debug("invoked login()");
  const { username, password } = req.body;
  const loginData = userService.login(username, password);
  console.debug("loginData = ", loginData);
  return res.status(201).json(Result.fromData(loginData));
};

const sign: RequestHandler = (req, res, next) => {
  console.debug("invoked sign()");
  console.debug("req.body = ", req.body);
  const token = userService.sign(req.body);
  console.debug("token = ", token);
  return res.status(200).json(Result.fromData(token));
};

const verify: RequestHandler = (req, res, next) => {
  console.debug("invoked verify()");
  const jwtToken = req.params.jwtToken;
  const userContent = userService.verify(jwtToken);
  return res.status(200).json(Result.fromData(userContent));
};

export default {
  login,
  sign,
  verify,
};
