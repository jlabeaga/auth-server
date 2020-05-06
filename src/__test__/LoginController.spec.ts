import request from "supertest";

import setupDb from "./setupDb";
import config from "./config";
const { BASE_URL } = config;
import fixture from "./fixture";
const { user1, user2, user3, user4, user5, user6 } = fixture;

beforeAll(async () => {
  await setupDb();
});

test("user1 is able to log in", async () => {
  const response = await request(BASE_URL).post("/auth/login").send({
    username: user1.userContent.username,
    password: user1.password,
  });
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

test("user6 is able to log out", async () => {
  const response = await request(BASE_URL)
    .post(`/auth/logout/${user6.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
    expect(response.body.data.message).toBe("Token revoked successfully.");
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("token is revoked", async () => {
  const precondition = await request(BASE_URL)
    .post(`/auth/logout/${user6.token}`)
    .send();
  const response = await request(BASE_URL)
    .get(`/auth/isRevoked/${user6.token}`)
    .send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
    expect(response.body.data.isRevoked).toBe(true);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});

test("token is not revoked", async () => {
  const response = await request(BASE_URL).get(`/auth/isRevoked/1234`).send();
  try {
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
    expect(response.body.data.isRevoked).toBe(false);
  } catch (error) {
    console.log("ERROR_FINDME: response.body :>> ", response.body);
    throw error;
  }
});
