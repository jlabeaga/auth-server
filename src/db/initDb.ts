import UserRepository from "../repository/UserRepository";
import User from "../model/User";
import Role from "../model/Role";

// db data
const users: User[] = [
  {
    id: 1,
    username: "user1",
    password: "$2a$12$R9TnZWRMZo6jpARi5ersueE/9vNPuBVTvpGozo8AV9BHI623BZOyq",
    email: "user1@hotmail.com",
    role: Role.ADMIN,
    enabled: true,
    createdAt: 1587899964446,
    updatedAt: 1587899964446,
  },
  {
    id: 2,
    username: "user2",
    password: "$2a$12$tPFN3DbpIVTiKnSI2V.voe6uK81ABmnnM2MS2jlEFaY5IuKJwlFV6",
    email: "user2@hotmail.com",
    role: Role.USER,
    enabled: true,
    createdAt: 1587899988715,
    updatedAt: 1587899988715,
  },
  {
    id: 3,
    username: "user3",
    password: "$2a$12$NtjMB7QKFqdu/av7Xpj2aepy8m5sdcWVH5N8/RRdH1OgC53NSTCDK",
    email: "user3@hotmail.com",
    role: Role.ADMIN,
    enabled: false,
    createdAt: 1587900008563,
    updatedAt: 1587900008563,
  },
  {
    id: 4,
    username: "user4",
    password: "$2a$12$3nr6ofje93Efx7cJYAJCCerAQbcJLtchHIR6QaHHhazEkpnn0KTFO",
    email: "user4@hotmail.com",
    role: Role.USER,
    enabled: false,
    createdAt: 1587900025129,
    updatedAt: 1587900025129,
  },
];

function initDb() {
  console.log("initDb BEFORE");
  UserRepository.save(users);
  console.log("initDb AFTER");
}

export default initDb;
