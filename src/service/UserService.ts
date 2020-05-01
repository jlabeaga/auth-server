import fs from "fs";
import { validate } from "class-validator";
import User from "../model/User";
import UserUtils from "../model/UserUtils";
import EncryptService from "./EncryptService";
import LoginData from "../model/LoginData";
import UserRepository from "../repository/UserRepository";
import UserContent from "../model/UserContent";

function findAll(): User[] {
  return UserRepository.loadAll();
}

function findOne(id: number): User {
  const user = findAll().find((user) => user.id === id);
  if (user === undefined) {
    throw Error(`Unable to find user with id = ${id}`);
  }
  console.debug("found user", user);
  return user;
}

function findByUsername(username: string): User | undefined {
  return findAll().find((user) => user.username === username);
}

function exist(id: number): boolean {
  try {
    if (findOne(id) !== undefined) return true;
  } finally {
    return false;
  }
}

function create(userBody: any): User {
  let user = new User(
    userBody.id,
    userBody.username,
    EncryptService.hash(userBody.password),
    userBody.email,
    userBody.role,
    userBody.enabled
  );
  console.log("creating user: ", user);
  validate(user);
  const users = findAll();
  if (users.find((_) => _.id === user.id)) {
    throw Error(`Unable to create user. Id already exists = ${user.id}`);
  }
  if (users.find((_) => _.username === user.username)) {
    throw Error(
      `Unable to create user. Username already exists = ${user.username}`
    );
  }
  if (users.find((_) => _.email === user.email)) {
    throw Error(`Unable to create user. Email already exists = ${user.email}`);
  }
  if (!user.username || user.username.length < 5) {
    throw Error(`Unable to create user. Username is too short.`);
  }
  if (!user.password || user.password.length < 5) {
    throw Error(`Unable to create user. Password is too short.`);
  }
  const newUser = { ...user, password: EncryptService.hash(user.password) };
  UserRepository.save([...users, newUser]);
  return newUser;
}

function update(id: number, userBody: any): User {
  const dbUser = findOne(id);
  const users = findAll();
  if (
    userBody.username &&
    users.find((_) => _.username === userBody.username)
  ) {
    throw Error(
      `Unable to update user. Username already exists = ${userBody.username}`
    );
  }
  if (userBody.email && users.find((_) => _.email === userBody.email)) {
    throw Error(
      `Unable to update user. Email already exists = ${userBody.email}`
    );
  }
  if (userBody.password) {
    console.log("new password: " + userBody.password);
    userBody.password = EncryptService.hash(userBody.password);
  }
  const mergedUser: User = Object.assign(dbUser, userBody) as User;
  validate(mergedUser);
  const updatedUsers = findAll().map((u) => (u.id === id ? mergedUser : u));
  UserRepository.save(updatedUsers);
  return mergedUser;
}

function remove(id: number): void {
  try {
    findOne(id);
  } catch (err) {
    throw Error(
      `Unable to delete user with id = ${id} because it does not exist.`
    );
  }
  const users = findAll().filter((u) => u.id !== id);
  UserRepository.save(users);
}

function login(username: string, password: string): LoginData {
  const error = Error("Login failed. Incorrect username or password");
  if (!username || !password) {
    throw error;
  }
  const user = findByUsername(username);
  if (user === undefined) {
    throw error;
  }
  if (!EncryptService.compare(password, user.password)) {
    throw error;
  }
  const userContent = UserUtils.fromUser(user);
  const token = EncryptService.sign(userContent);
  const loginData = new LoginData(userContent, token);
  console.log("jwt loginData = ", loginData);
  return loginData;
}

function verify(jwtToken: string): UserContent {
  return EncryptService.verifyJwtToken(jwtToken) as UserContent;
}

function sign(content: any): string {
  return EncryptService.sign(content);
}

export default {
  login,
  sign,
  verify,
  findAll,
  findOne,
  create,
  update,
  remove,
};
