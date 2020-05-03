import { User } from "../entity/User";
import UserContent from "./UserContent";

function fromUser(user: User): UserContent {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    enabled: user.enabled,
  };
}

export default {
  fromUser,
};
