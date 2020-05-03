import { RequestHandler } from "express";

import UserService from "../service/UserService";
import Result from "../model/Result";
import TicketErrorUtils from "../model/TicketErrorUtils";

const login: RequestHandler = async (req, res, next) => {
  console.debug("invoked login()");
  try {
    const { username, password } = req.body;
    const loginData = await UserService.login(username, password);
    console.debug("loginData = ", loginData);
    return res.status(201).json(Result.fromData(loginData));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when login user at LoginController"
    );
    return next(ticketError);
  }
};

const sign: RequestHandler = async (req, res, next) => {
  console.debug("invoked sign()");
  try {
    console.debug("req.body = ", req.body);
    const token = await UserService.sign(req.body);
    console.debug("token = ", token);
    return res.status(200).json(Result.fromData(token));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when signing content at LoginController"
    );
    return next(ticketError);
  }
};

const verify: RequestHandler = async (req, res, next) => {
  console.debug("invoked verify()");
  try {
    const jwtToken = req.params.jwtToken;
    const userContent = await UserService.verify(jwtToken);
    return res.status(200).json(Result.fromData(userContent));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when verifying token at LoginController"
    );
    return next(ticketError);
  }
};

export default {
  login,
  sign,
  verify,
};
