import request from "supertest";

import setupDb from "./setupDb";
import config from "./config";
const { BASE_URL } = config;
import fixture from "./fixture";
const { user1, user2, user3, user4, user5, user6 } = fixture;

beforeEach(async () => {
  await setupDb();
});

test("user6 is created successfully", async () => {
  let user6Body = { ...user6.userContent, password: "user6" };
  const response = await request(BASE_URL).post("/user").send(user6Body);
  try {
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(0);
    expect(response.body.data.username).toBe(user6.userContent.username);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("user profile is found", async () => {
  const response = await request(BASE_URL)
    .get("/me")
    .set("Authorization", `Bearer ${user2.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
    expect(response.body.data.username).toBe(user2.userContent.username);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("user profile is modified", async () => {
  const response = await request(BASE_URL)
    .patch("/me")
    .set("Authorization", `Bearer ${user2.token}`)
    .send({
      email: "newemail@hotmail.com",
    });
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
    expect(response.body.data.email).toBe("newemail@hotmail.com");
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("user is deleted", async () => {
  const response = await request(BASE_URL)
    .delete("/me")
    .set("Authorization", `Bearer ${user2.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
    expect(response.body.data).toBe("User id = 2 removed.");
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});
