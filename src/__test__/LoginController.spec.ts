import request from "supertest";

import setupDb from "./setupDb";
import config from "./config";
const { BASE_URL } = config;
import fixture from "./fixture";
import Status from "../model/Status";
const { user1, user2, user3, user4, user5, user6 } = fixture;

beforeAll(async () => {
  await setupDb();
});

test("/api/auth/register: user6 is created successfully", async () => {
  let user6Body = { ...user6.userContent, password: "user6" };
  const response = await request(BASE_URL)
    .post("/api/auth/register")
    .send(user6Body);
  try {
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(Status.SUCCESS);
    expect(response.body.data.username).toBe(user6.userContent.username);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("/api/auth/login: user1 is able to log in", async () => {
  const response = await request(BASE_URL).post("/api/auth/login").send({
    username: user1.userContent.username,
    password: user1.password,
  });
  try {
    expect(response.status).toBe(201);
    expect(response.body.status).toBe(Status.SUCCESS);
    expect(response.body.data.user.username).toBe("user1");
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("/api/auth/login: user1 is unable to log in using wrong password", async () => {
  const response = await request(BASE_URL).post("/api/auth/login").send({
    username: user1.userContent.username,
    password: "XXXX",
  });
  try {
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(Status.ERROR);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("/api/auth/login: non existing userXXX is unable to log in", async () => {
  const response = await request(BASE_URL).post("/api/auth/login").send({
    username: "userXXXX",
    password: "XXXX",
  });
  try {
    expect(response.status).toBe(500);
    expect(response.body.status).toBe(Status.ERROR);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("/api/auth/logout: user6 is able to log out", async () => {
  const response = await request(BASE_URL)
    .post(`/api/auth/logout/${user6.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(Status.SUCCESS);
    expect(response.body.message).toBe("Token successfully revoked.");
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("/api/auth/token: token is revoked", async () => {
  const precondition = await request(BASE_URL)
    .post(`/api/auth/logout/${user6.token}`)
    .send();
  const response = await request(BASE_URL)
    .get(`/api/auth/isRevoked/${user6.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(Status.SUCCESS);
    expect(response.body.data).toBe(true);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("/api/auth/isRevoked: token is not revoked", async () => {
  const response = await request(BASE_URL)
    .get(`/api/auth/isRevoked/1234`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(Status.SUCCESS);
    expect(response.body.data).toBe(false);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});
