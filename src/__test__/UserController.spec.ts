import request from "supertest";

import setupDb from "./setupDb";
import config from "./config";
const { BASE_URL } = config;
import fixture from "./fixture";
const { user1, user2, user3, user4 } = fixture;

beforeEach(() => {
  setupDb();
});

test("all users are displayed", async () => {
  const response = await request(BASE_URL)
    .get("/user")
    .set("Authorization", `Bearer ${user1.token}`)
    .expect(200);
  expect(response.body.status).toBe(0);
  expect(response.body.data).toHaveLength(4);
  expect(response.body.data[0].username).toBe("user1");
});

test("user with id = 1 is found", async () => {
  const response = await request(BASE_URL)
    .get("/user/1")
    .set("Authorization", `Bearer ${user1.token}`)
    .expect(200);
  expect(response.body.status).toBe(0);
  expect(response.body.data.username).toBe("user1");
});

test("user5 is created successfully", async () => {
  const response = await request(BASE_URL)
    .post("/user")
    .set("Authorization", `Bearer ${user1.token}`)
    .send({
      username: "user5",
      password: "user5",
      email: "user5@hotmail.com",
    })
    .expect(201);
  expect(response.body.status).toBe(0);
  expect(response.body.data.username).toBe("user5");
});

test("user with already existing username can not be created", async () => {
  const response = await request(BASE_URL)
    .post("/user")
    .set("Authorization", `Bearer ${user1.token}`)
    .send({
      username: "user1",
      password: "user5",
      email: "user5@hotmail.com",
    })
    .expect(500);
  expect(response.body.status).toBe(1);
  expect(response.body.error).toContain("exist");
});
