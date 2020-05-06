type UserContentExp = {
  id: number;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
  iat: Date;
  exp: Date;
};

export default UserContentExp;
