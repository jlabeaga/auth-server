import express from "express";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import "reflect-metadata";

import testRoute from "./route/testRoute";
import userRoute from "./route/userRoute";
import meRoute from "./route/meRoute";
import loginRoute from "./route/authRoute";
import authMiddleware from "./middleware/authMiddleware";
import Result from "./model/Result";
import adminMiddleware from "./middleware/adminMiddleware";
import UserController from "./controller/UserController";

const app = express();

// use cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );

  next();
});

app.use(json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const { body, query, params, header, url, method } = req;
  if (url) console.log("url = ", url);
  if (method) console.log("method = ", method);
  if (params) console.log("params = ", params);
  if (body) console.log("body = ", body);
  // if (header("authorization"))
  //   console.log('header("authorization") = ', header("authorization"));
  // if (query) console.log("query = ", query);
  next();
});

app.use("/auth", loginRoute);

app.post("/user", UserController.create);

app.use("/user", authMiddleware, adminMiddleware, userRoute);

app.use("/me", authMiddleware, meRoute);

app.use("/test", authMiddleware, adminMiddleware, testRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .json(Result.fromErrorMessage("Could not find this route:" + req.url));
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("error in app: ", error);
  if (res.headersSent) {
    console.log("headersSent");
    return next(error);
  }
  if (process.env.MYAPP_DEBUG !== "true") {
    error.stack = "";
  }
  res.status(500).json(Result.fromError(error));
});

console.log("started app");

export default app;
