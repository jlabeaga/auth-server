import { RequestHandler } from "express";
import initializeDb from "../db/initDb";
import Result from "../model/Result";
import Status from "../model/Status";

const initDb: RequestHandler = (req, res, next) => {
  console.debug("invoked initDb()");
  initializeDb();
  return res
    .status(200)
    .json(new Result(Status.OK, { message: "DB successfully initialized." }));
};

const test: RequestHandler = (req, res, next) => {
  console.debug("invoked test()");
  throw Error("testing error");
};

export default {
  initDb,
  test,
};
