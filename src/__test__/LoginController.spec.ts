import request from "supertest";

import setupDb from "./setupDb";
import config from "./config";
const { BASE_URL } = config;
import fixture from "./fixture";
const { user1, user2, user3, user4 } = fixture;

beforeEach(async () => {
  await setupDb();
});

let testName: string;

testName = "sample test";
test.skip(testName, async () => {
  console.log("sample test");
});

testName = "user1 is able to log in";
test.skip(testName, async () => {
  const response = await request(BASE_URL).post("/auth/login").send({
    username: user1.userContent.username,
    password: user1.password,
  });
  try {
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(0);
    expect(response.body.data.user.username).toBe("user1");
  } catch (error) {
    console.log("testName: ", testName);
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

testName = "user1 is unable to log in using wrong password";
test.skip(testName, async () => {
  const response = await request(BASE_URL).post("/auth/login").send({
    username: user1.userContent.username,
    password: "XXXX",
  });
  try {
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(1);
  } catch (error) {
    console.log("testName: ", testName);
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

testName = "non existing userXXX is unable to log in";
test.skip(testName, async () => {
  const response = await request(BASE_URL).post("/auth/login").send({
    username: "userXXXX",
    password: "XXXX",
  });
  try {
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(1);
  } catch (error) {
    console.log("testName: ", testName);
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});
