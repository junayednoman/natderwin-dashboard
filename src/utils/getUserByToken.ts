import { jwtDecode } from "jwt-decode";

const getUserByToken = (token: string) => {
  let user = null
  if (token) user = jwtDecode(token);
  return user;
};

export default getUserByToken;