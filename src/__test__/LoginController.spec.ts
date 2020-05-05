import request from "supertest";

import setupDb from "./setupDb";
import config from "./config";
const { BASE_URL } = config;
import fixture from "./fixture";
const { user1, user2, user3, user4 } = fixture;

beforeAll(async () => {
  await setupDb();
});

test("user1 is able to log in", async () => {
  const response = await request(BASE_URL).post("/auth/login").send({
    username: "user1",
    password: "user1",
  });
  //   .send({
  //   username: user1.userContent.username,
  //   password: user1.password,
  // });
  try {
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(0);
    expect(response.body.data.user.username).toBe("user1");
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("user1 is unable to log in using wrong password", async () => {
  const response = await request(BASE_URL).post("/auth/login").send({
    username: user1.userContent.username,
    password: "XXXX",
  });
  try {
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(1);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("non existing userXXX is unable to log in", async () => {
  const response = await request(BASE_URL).post("/auth/login").send({
    username: "userXXXX",
    password: "XXXX",
  });
  try {
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(1);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});
