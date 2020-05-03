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

testName = "all users are displayed";
test.skip(testName, async () => {
  const response = await request(BASE_URL)
    .get("/user")
    .set("Authorization", `Bearer ${user1.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
    expect(response.body.data).toHaveLength(4);
  } catch (error) {
    console.log("testName: ", testName);
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

testName = "user with id = 1 is found";
test.skip(testName, async () => {
  const response = await request(BASE_URL)
    .get("/user/1")
    .set("Authorization", `Bearer ${user1.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
    expect(response.body.data.username).toBe("user1");
  } catch (error) {
    console.log("testName: ", testName);
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

testName = "user6 is created successfully";
test.skip(testName, async () => {
  const response = await request(BASE_URL)
    .post("/user")
    .set("Authorization", `Bearer ${user1.token}`)
    .send({
      username: "user6",
      password: "user6",
      email: "user6@hotmail.com",
    });
  try {
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(0);
    expect(response.body.data.username).toBe("user5");
  } catch (error) {
    console.log("testName: ", testName);
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

testName = "user with already existing username can not be created";
test.skip(testName, async () => {
  const response = await request(BASE_URL)
    .post("/user")
    .set("Authorization", `Bearer ${user1.token}`)
    .send({
      username: "user2",
      password: "user2",
      email: "user2@hotmail.com",
    });
  try {
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(1);
    expect(response.body.error).toContain("exist");
  } catch (error) {
    console.log("testName: ", testName);
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});
