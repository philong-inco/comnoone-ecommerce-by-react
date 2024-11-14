import {
  SESSION_ID_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  USER_INFO_STORAGE_KEY,
} from "../constants";
import { ROUTE_PATH } from "../constants/routes";

export const onLogOut = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_INFO_STORAGE_KEY);
  localStorage.removeItem(SESSION_ID_STORAGE_KEY);
  window.location.href = ROUTE_PATH.SIGN_IN;
};

export const useAuth = () => {
  const isLogged = localStorage.getItem(TOKEN_STORAGE_KEY);
  const userInfo = JSON.parse(
    localStorage.getItem(USER_INFO_STORAGE_KEY) || "{}"
  );
  const sessionId = localStorage.getItem(SESSION_ID_STORAGE_KEY);

  const onLogin = (data) => {
    debugger;
    localStorage.setItem(TOKEN_STORAGE_KEY, data.jwt);
    localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(data));
    window.location.href = ROUTE_PATH.HOME;
  };

  return {
    isLogin: !!isLogged,
    userInfo,
    onLogin,
    onLogOut,
    sessionId,
  };
};
