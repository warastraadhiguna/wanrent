import jwtDecode from "jwt-decode";

export const checkAccessTokenJwtExpired = (accessToken) => {
  const decoded = jwtDecode(accessToken);
  const currentDate = new Date();

  return decoded.exp * 1000 < currentDate.getTime();
};
