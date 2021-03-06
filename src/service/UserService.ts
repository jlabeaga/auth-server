import fs from "fs";
//import { validate } from "class-validator";

import { User } from "../entity/User";
import UserUtils from "../model/UserUtils";
import EncryptService from "./EncryptService";
import LoginData from "../model/LoginData";
import UserContent from "../model/UserContent";
import { getTypeormConnection } from "../orm/connection";
import Role from "../model/Role";

async function findAll(): Promise<User[]> {
  const users = await (await getTypeormConnection()).manager.find(User);
  return users;
}

async function findOne(id: number): Promise<User | undefined> {
  const user = await (await getTypeormConnection()).manager.findOne(User, id);
  return user;
}

async function findByUsername(username: string): Promise<User | undefined> {
  const user = (await getTypeormConnection())
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.username like :username", { username: username })
    .getOne();
  return user;
}

async function findByEmail(email: string): Promise<User | undefined> {
  const user = (await getTypeormConnection())
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.email like :email", { email: email })
    .getOne();
  return user;
}

async function create(userBody: any): Promise<User> {
  let user = new User();
  user.id = userBody.id;
  user.username = userBody.username;
  user.password = userBody.password;
  user.email = userBody.email;
  user.role = userBody.role;
  user.enabled = userBody.enabled;
  // console.log("creating user: ", user);
  await validateNewUser(user);
  user.password = EncryptService.hash(user.password);
  let newUser = await (await getTypeormConnection()).manager.save(user);
  console.log("newUser :>> ", newUser);
  return newUser;
}

async function register(userBody: any): Promise<User> {
  let user = new User();
  user.id = userBody.id;
  user.username = userBody.username;
  user.password = userBody.password;
  user.email = userBody.email;
  user.role = Role.USER;
  user.enabled = true;
  validateNewUser(user);
  user.password = EncryptService.hash(user.password);
  let newUser = await (await getTypeormConnection()).manager.save(user);
  console.log("newUser :>> ", newUser);
  return newUser;
}

async function update(id: number, userBody: any): Promise<User | undefined> {
  const existingUser = findOne(id);
  if (!existingUser) {
    return undefined;
  }
  if (userBody.password) {
    console.log("new password: " + userBody.password);
    userBody.password = EncryptService.hash(userBody.password);
  }
  await (await getTypeormConnection()).manager.update(User, id, userBody);
  const updatedUser = findOne(id);
  return updatedUser;
}

async function remove(id: number): Promise<void> {
  await (await getTypeormConnection())
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: id })
    .execute();
}

async function disable(id: number): Promise<User | undefined> {
  const connection = await getTypeormConnection();
  await connection
    .createQueryBuilder()
    .update(User)
    .set({ enabled: false })
    .where("id = :id", { id: id })
    .execute();
  const user = await findOne(id);
  return user;
}

async function login(username: string, password: string): Promise<LoginData> {
  const error = Error("Login failed. Incorrect username or password");
  if (!username || !password) {
    throw error;
  }
  const user = await findByUsername(username);
  if (user === undefined) {
    throw error;
  }
  if (!EncryptService.compare(password, user.password)) {
    throw error;
  }
  if (!user.enabled) {
    throw new Error("User is disabled.");
  }
  const userContent = UserUtils.fromUser(user);
  const token = EncryptService.sign(userContent);
  const loginData = new LoginData(userContent, token);
  console.log("jwt loginData = ", loginData);
  return loginData;
}

async function validateNewUser(user: User) {
  let existingUser;
  if (user.id && user.id > 0) {
    existingUser = await findOne(user.id);
    if (existingUser) {
      throw new Error(`User with id = ${user.id} already exist.`);
    }
  }
  if (!user.username) {
    throw new Error(`Username is mandatory.`);
  }
  existingUser = await findByUsername(user.username);
  if (existingUser) {
    throw new Error(`User with username = ${user.username} already exist.`);
  }
  if (!user.email) {
    throw new Error(`Email is mandatory.`);
  }
  existingUser = await findByEmail(user.email);
  if (existingUser) {
    throw new Error(`User with email = ${user.email} already exist.`);
  }
  if (!user.password) {
    throw new Error(`Password is mandatory.`);
  }
}

// function validate(user: User) {
//   if (user.id && (await findOne(user.id))) {
//     throw Error(`Unable to create user. Id already exists = ${user.id}`);
//   }
//   if (findByUsername(user.username)) {
//     throw Error(
//       `Unable to create user. Username already exists = ${user.username}`
//     );
//   }
//   if (findByEmail(user.email)) {
//     throw Error(`Unable to create user. Email already exists = ${user.email}`);
//   }
//   if (!user.username || user.username.length < 5) {
//     throw Error(`Unable to create user. Username is too short.`);
//   }
//   if (!user.password || user.password.length < 5) {
//     throw Error(`Unable to create user. Password is too short.`);
//   }
// }

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
  disable,
};
