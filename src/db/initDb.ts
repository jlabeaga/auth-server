import Role from "../model/Role";
import { getTypeormConnection } from "../orm/connection";
import { Connection } from "typeorm";
import { User } from "../entity/User";

// db data
const users = [
  {
    id: 1,
    username: "user1",
    password: "$2a$12$R9TnZWRMZo6jpARi5ersueE/9vNPuBVTvpGozo8AV9BHI623BZOyq",
    email: "user1@hotmail.com",
    role: Role.ADMIN,
    enabled: true,
  },
  {
    id: 2,
    username: "user2",
    password: "$2a$12$tPFN3DbpIVTiKnSI2V.voe6uK81ABmnnM2MS2jlEFaY5IuKJwlFV6",
    email: "user2@hotmail.com",
    role: Role.USER,
    enabled: true,
  },
  {
    id: 3,
    username: "user3",
    password: "$2a$12$NtjMB7QKFqdu/av7Xpj2aepy8m5sdcWVH5N8/RRdH1OgC53NSTCDK",
    email: "user3@hotmail.com",
    role: Role.ADMIN,
    enabled: false,
  },
  {
    id: 4,
    username: "user4",
    password: "$2a$12$3nr6ofje93Efx7cJYAJCCerAQbcJLtchHIR6QaHHhazEkpnn0KTFO",
    email: "user4@hotmail.com",
    role: Role.USER,
    enabled: false,
  },
];

async function initDb(): Promise<void> {
  console.log("initDb BEFORE");
  let connection: Connection;
  try {
    connection = await getTypeormConnection();

    connection.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.connection
        .createQueryBuilder()
        .delete()
        .from(User)
        .execute();

      console.log("initDb: data deleted");

      await transactionalEntityManager.connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(users)
        .execute();

      console.log("initDb: data inserted");
    });
  } catch (error) {
    console.log("error at initDb");
    throw error;
  }
  console.log("initDb AFTER");
}

export default initDb;
