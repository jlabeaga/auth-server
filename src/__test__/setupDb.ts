import request from "supertest";

import config from "./config";
const { BASE_URL } = config;
import fixture from "./fixture";
const { user1 } = fixture;

async function setupDb() {
  console.log("setupDb BEFORE");
  const response = await request(BASE_URL)
    .post("/test/initDb")
    .set("Authorization", `Bearer ${user1.token}`)
    .send();
  console.log(await response.body);
  console.log("setupDb AFTER");
}

export default setupDb;
