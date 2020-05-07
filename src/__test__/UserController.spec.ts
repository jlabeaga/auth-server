import request from "supertest";

import setupDb from "./setupDb";
import config from "./config";
const { BASE_URL } = config;
import fixture from "./fixture";
import Status from "../model/Status";
const { user1, user2, user3, user4, user5, user6 } = fixture;

beforeEach(async () => {
  await setupDb();
});

test("/api/admin: all users are displayed", async () => {
  const response = await request(BASE_URL)
    .get("/api/admin")
    .set("Authorization", `Bearer ${user1.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(Status.SUCCESS);
    expect(response.body.data).toHaveLength(5);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("/api/admin/1: user with id = 1 is found", async () => {
  const response = await request(BASE_URL)
    .get("/api/admin/1")
    .set("Authorization", `Bearer ${user1.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(Status.SUCCESS);
    expect(response.body.data.username).toBe("user1");
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("/api/admin: user6 is created successfully", async () => {
  let user6Body = { ...user6.userContent, password: "user6" };
  const response = await request(BASE_URL)
    .post("/api/admin")
    .set("Authorization", `Bearer ${user1.token}`)
    .send(user6Body);
  try {
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(Status.SUCCESS);
    expect(response.body.data.username).toBe("user6");
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("/api/admin: user with already existing username can not be created", async () => {
  const response = await request(BASE_URL)
    .post("/api/admin")
    .set("Authorization", `Bearer ${user1.token}`)
    .send({
      username: "user2",
      password: "user2",
      email: "user2@hotmail.com",
      role: "USER",
      enabled: true,
    });
  try {
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(Status.ERROR);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});
