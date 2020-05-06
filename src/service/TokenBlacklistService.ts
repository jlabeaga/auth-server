import EncryptService from "./EncryptService";
import { getTypeormConnection } from "../orm/connection";
import UserContentExp from "../model/UserContentExp";
import { TokenBlacklist } from "../entity/TokenBlacklist";
import { LessThan } from "typeorm";

async function revoke(token: string): Promise<void> {
  if (await isRevoked(token)) {
    console.log(`token is already revoked: ${token}`);
    return;
  }
  const { exp } = EncryptService.verifyJwtToken(token) as UserContentExp;
  console.log("expirationDate :>> ", exp);
  const revokation = new TokenBlacklist();
  revokation.token = token;
  revokation.expirationDate = exp;
  const connection = await getTypeormConnection();
  await connection.manager.save(revokation);
  // take the chance to purge old tokens
  //await purgeOldTokens();
}

async function purgeOldTokens(): Promise<void> {
  const connection = await getTypeormConnection();
  await connection.manager.delete(TokenBlacklist, {
    expirationDate: LessThan(Math.floor(Date.now() / 1000)),
  });
}

async function isRevoked(token: string): Promise<boolean> {
  try {
    const tokenFound = await (await getTypeormConnection()).manager.find(
      TokenBlacklist,
      {
        where: { token: token },
      }
    );
    console.log("tokenFound :>> ", tokenFound);
    if (tokenFound && tokenFound.length > 0) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

export default {
  revoke,
  isRevoked,
  purgeOldTokens,
};
