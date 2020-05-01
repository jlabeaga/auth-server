import Role from "./Role";

type UserContent = {
  id: number;
  username: string;
  email: string;
  role: Role;
  enabled: boolean;
};

export default UserContent;
