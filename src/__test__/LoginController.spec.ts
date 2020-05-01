import request from "supertest";

import setupDb from "./setupDb";
import config from "./config";
const { BASE_URL } = config;
import fixture from "./fixture";
const { user1, user2, user3, user4 } = fixture;

beforeEach(async () => {
  await setupDb();
});

test("user1 is able to log in", async () => {
  const response = await request(BASE_URL)
    .post("/auth/login")
    .send({
      username: user1.userContent.username,
      password: user1.password,
    })
    .expect(201);
  // console.log("response.body :>> ", response.body);
  expect(response.body.status).toBe(0);
  expect(response.body.data.user.username).toBe("user1");
});

test("user1 is unable to log in using wrong password", async () => {
  const response = await request(BASE_URL)
    .post("/auth/login")
    .send({
      username: user1.userContent.username,
      password: "XXXX",
    })
    .expect(500);
  // console.log("response.body :>> ", response.body);
  expect(response.body.status).toBe(1);
});

test("non existing userXXX is unable to log in", async () => {
  const response = await request(BASE_URL)
    .post("/auth/login")
    .send({
      username: "userXXXX",
      password: "XXXX",
    })
    .expect(500);
  // console.log("response.body :>> ", response.body);
  expect(response.body.status).toBe(1);
});