import { RequestHandler } from "express";
import initializeDb from "../db/initDb";
import Result from "../model/Result";
import Status from "../model/Status";
import { getTypeormConnection } from "../orm/connection";
import { User } from "../entity/User";
import TicketErrorUtils from "../model/TicketErrorUtils";

const initDb: RequestHandler = (req, res, next) => {
  console.debug("invoked initDb()");
  try {
    initializeDb();
    return res
      .status(200)
      .json(new Result(Status.OK, { message: "DB successfully initialized." }));
  } catch (error) {
    const ticketError = TicketErrorUtils.createTicketAndLog(
      error,
      "Error at initDb"
    );
    return next(ticketError);
  }
};

const test: RequestHandler = async (req, res, next) => {
  console.debug("invoked test()");
  const ticketError = TicketErrorUtils.createTicketAndLog(
    new Error("Faked error"),
    "Error at TestController"
  );
  return next(ticketError);
};

export default {
  initDb,
  test,
};
