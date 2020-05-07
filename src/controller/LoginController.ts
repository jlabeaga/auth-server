import { RequestHandler } from "express";

import UserService from "../service/UserService";
import Result from "../model/Result";
import TicketErrorUtils from "../model/TicketErrorUtils";
import TokenBlacklistService from "../service/TokenBlacklistService";
import UserUtils from "../model/UserUtils";
import Role from "../model/Role";

const register: RequestHandler = async (req, res, next) => {
  console.debug("invoked register()");
  try {
    const { id, username, password, email } = req.body;
    let input = {};
    if (id) {
      input = { ...input, id };
    }
    if (username) {
      input = { ...input, username };
    }
    if (password) {
      input = { ...input, password };
    }
    if (email) {
      input = { ...input, email };
    }
    input = { ...input, role: Role.USER, enabled: true };
    const createdUser = await UserService.create(input);
    const userContent = UserUtils.fromUser(createdUser);
    return res
      .status(201)
      .json(Result.fromData(userContent, "User successfully registered."));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when creating user at LoginController"
    );
    return next(ticketError);
  }
};

const login: RequestHandler = async (req, res, next) => {
  console.debug("invoked login()");
  try {
    const { username, password } = req.body;
    const loginData = await UserService.login(username, password);
    console.debug("loginData = ", loginData);
    return res
      .status(201)
      .json(Result.fromData(loginData, "User successfully logged in."));
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
    return res
      .status(200)
      .json(Result.fromData(token, "Content successfully signed."));
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
    return res
      .status(200)
      .json(Result.fromData(userContent, "Token successfully verified."));
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
      .json(Result.fromData(jwtToken, "Token successfully revoked."));
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
    return res
      .status(200)
      .json(
        Result.fromData(isRevoked, "Token isRevoked successfully invoked.")
      );
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
      .json(Result.fromData(null, "Old tokens successfully purged."));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error when purgin old tokens at LoginController"
    );
    return next(ticketError);
  }
};

export default {
  register,
  login,
  sign,
  verify,
  logout,
  isRevoked,
  purgeOldTokens,
};
