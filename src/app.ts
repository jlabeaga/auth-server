import express from "express";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import "reflect-metadata";
const swaggerUi = require("swagger-ui-express");
require("require-yaml");
const swaggerDocument = require("./assets/swagger.yaml");

import testRoute from "./route/testRoute";
import adminRoute from "./route/adminRoute";
import meRoute from "./route/meRoute";
import loginRoute from "./route/authRoute";
import authMiddleware from "./middleware/authMiddleware";
import Result from "./model/Result";
import adminMiddleware from "./middleware/adminMiddleware";

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
  const { body, query, params, headers, url, method } = req;
  if (url) console.log("url = ", url);
  if (method) console.log("method = ", method);
  if (params) console.log("params = ", params);
  if (body) console.log("body = ", body);
  // if (headers) console.log("headers = ", headers);
  // if (query) console.log("query = ", query);
  res.set("operation", `${method} ${url} ${params}`);
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", loginRoute);

app.use("/api/admin", authMiddleware, adminMiddleware, adminRoute);

app.use("/api/me", authMiddleware, meRoute);

app.use("/api/test", authMiddleware, adminMiddleware, testRoute);

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
  } else {
    error.stack = `operation: ${res.get("operation")}\n` + error.stack;
  }
  res.status(500).json(Result.fromError(error));
});

console.log("started app");

export default app;
