import "reflect-metadata";
import { createConnection, getConnection, Connection } from "typeorm";
import { User } from "../entity/User";
import { root } from "../paths";

const dbFilePath = `${root}/dist/db/${process.env.MYAPP_DB_SQLITE_FILE}`;

console.log("dbFilePath = ", dbFilePath);

let connection: Connection;

export async function getTypeormConnection(): Promise<Connection> {
  let connection: Connection;
  try {
    connection = await getConnection();
    if (connection) {
      return connection;
    }
  } catch (err) {
    console.log("error on getConnection: ", err);
  }
  try {
    console.log("attempting createConnection");
    connection = await createConnection({
      type: "sqlite",
      database: dbFilePath,
      synchronize: true,
      logging: true,
      entities: [User],
    });
    console.log("connection created");
    return getConnection();
  } catch (err) {
    console.log("error on createConnection: ", err);
    throw err;
  }
}
