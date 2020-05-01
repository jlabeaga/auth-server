import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  MinLength,
} from "class-validator";

import Role from "./Role";

export default class User {
  @IsInt()
  public id: number;
  @MinLength(3)
  public username: string;
  // hashed password with bcrypt
  @MinLength(3)
  public password: string;
  @IsEmail()
  public email: string;
  // Role: USER; ADMIN
  public role: Role;
  public enabled: boolean;
  public createdAt: number;
  public updatedAt: number;

  constructor(
    id: number,
    username: string,
    // hashed password with bcrypt
    password: string,
    email: string,
    // Role: USER; ADMIN
    role: Role,
    enabled: boolean
  ) {
    const now = Date.now();
    if (id) {
      this.id = id;
    } else {
      this.id = now;
    }
    console.log("creating User.id = " + this.id);
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.enabled = enabled;
    this.createdAt = now;
    this.updatedAt = now;
  }
}
