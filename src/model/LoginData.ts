import UserContent from "./UserContent";

class LoginData {
  constructor(public user: UserContent, public jwtToken: string) {}
}

export default LoginData;
