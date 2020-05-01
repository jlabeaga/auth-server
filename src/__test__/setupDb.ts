import request from "supertest";

import config from "./config";
const { BASE_URL } = config;

async function setupDb() {
  console.log("setupDb BEFORE");
  const response = await request(BASE_URL).post("/test/initDb").send();
  console.log("setupDb AFTER");
}

export default setupDb;
