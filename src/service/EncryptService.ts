import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.MYAPP_JWT_SECRET_KEY as string;
const jwtTokenExpiresIn = process.env.MYAPP_JWT_TOKEN_EXPIRES_IN as string;

function hash(password: string): string {
  return bcrypt.hashSync(password, 12);
}

function compare(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

function sign(content: any) {
  return jwt.sign(content, jwtSecretKey, { expiresIn: jwtTokenExpiresIn });
}

function verifyJwtToken(token: string) {
  return jwt.verify(token, jwtSecretKey);
}

export default {
  hash,
  compare,
  sign,
  verifyJwtToken,
};
