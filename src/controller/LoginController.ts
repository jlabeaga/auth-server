import { RequestHandler } from "express";

import UserService from "../service/UserService";
import Result from "../model/Result";
import TicketErrorUtils from "../model/TicketErrorUtils";
import TokenBlacklistService from "../service/TokenBlacklistService";

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

const logout: RequestHandler = async (req, res, next) => {
  console.debug("invoked logout()");
  try {
    const jwtToken = req.params.jwtToken;
    await TokenBlacklistService.revoke(jwtToken);
    return res
      .status(200)
      .json(Result.fromData({ message: "Token revoked successfully." }));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when revokint token at LoginController"
    );
    return next(ticketError);
  }
};

const isRevoked: RequestHandler = async (req, res, next) => {
  console.debug("invoked isRevoked()");
  try {
    const jwtToken = req.params.jwtToken;
    const isRevoked = await TokenBlacklistService.isRevoked(jwtToken);
    return res.status(200).json(Result.fromData({ isRevoked }));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when checking token revokation at LoginController"
    );
    return next(ticketError);
  }
};

const purgeOldTokens: RequestHandler = async (req, res, next) => {
  console.debug("invoked purgeOldTokens()");
  try {
    await TokenBlacklistService.purgeOldTokens();
    return res
      .status(200)
      .json(Result.fromData({ message: "Old tokens purged." }));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when purgin old tokens at LoginController"
    );
    return next(ticketError);
  }
};

export default {
  login,
  sign,
  verify,
  logout,
  isRevoked,
  purgeOldTokens,
};
