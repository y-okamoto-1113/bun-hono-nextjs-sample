import {
  GrantType,
  type SessionManager,
  type UserType,
  createKindeServerClient,
} from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

// 環境変数のチェック
const {
  KINDE_DOMAIN,
  KINDE_CLIENT_ID,
  KINDE_CLIENT_SECRET,
  KINDE_REDIRECT_URI,
  KINDE_LOGOUT_REDIRECT_URI,
} = process.env;

if (
  !KINDE_DOMAIN ||
  !KINDE_CLIENT_ID ||
  !KINDE_CLIENT_SECRET ||
  !KINDE_REDIRECT_URI ||
  !KINDE_LOGOUT_REDIRECT_URI
) {
  throw new Error("Missing required environment variables for Kinde client.");
}

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: KINDE_DOMAIN,
    clientId: KINDE_CLIENT_ID,
    clientSecret: KINDE_CLIENT_SECRET,
    redirectURL: KINDE_REDIRECT_URI,
    logoutRedirectURL: KINDE_LOGOUT_REDIRECT_URI,
  },
);

// const store: Record<string, unknown> = {};
export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      htpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    const keys = ["id_token", "access_token", "user", "refresh_token"];
    for (const key of keys) {
      deleteCookie(c, key);
    }
  },
});

import { createMiddleware } from "hono/factory";

type Env = {
  Variables: {
    user: UserType;
  };
};
export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const session = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(session);
    if (!isAuthenticated) {
      return c.json({ error: "Unauthorized, Heehaa!!!" }, 401);
    }

    const user = await kindeClient.getUserProfile(session);
    c.set("user", user);
    await next();
  } catch (e) {
    console.error(e);
    return c.json({ error: "Unauthorized!!!!!" }, 401);
  }
});
