import Cookies from "universal-cookie";
import { COOKIE_AUTH_TOKEN, COOKIE_USER_INFORMATION } from "./constants";

export const login = (authToken: string, name: string, email: string) => {
  const cookie = new Cookies();
  cookie.set(COOKIE_AUTH_TOKEN, authToken, {
    path: "/",
  });
  cookie.set(
    COOKIE_USER_INFORMATION,
    JSON.stringify({
      name,
      email,
    }),
    {
      path: "/",
    },
  );

  location.href = "/flash-sale";
};

export const logout = () => {
  const cookie = new Cookies();
  cookie.remove(COOKIE_AUTH_TOKEN, { path: "/" });
  cookie.remove(COOKIE_USER_INFORMATION, { path: "/" });

  location.href = "/login";
};
