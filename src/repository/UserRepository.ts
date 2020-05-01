import fs from "fs";
import path from "path";
import User from "../model/User";

const dbJsonFile = path.join(
  __dirname,
  "..",
  "db",
  process.env.MYAPP_DB_JSON_FILE as string
);

// console.log("dbJsonFile = ", dbJsonFile);

function loadAll(): User[] {
  const users: User[] = JSON.parse(fs.readFileSync(dbJsonFile, "utf-8"));
  // console.log("users", users);
  return users;
}

function save(users: User[]) {
  console.log(`saving users in file: ${dbJsonFile}`);
  fs.writeFileSync(
    dbJsonFile,
    JSON.stringify(
      users.sort((u1, u2) => u1.id - u2.id),
      null,
      2
    ),
    "utf-8"
  );
}

export default {
  loadAll,
  save,
};
