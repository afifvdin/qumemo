import "server-only";

export const IS_PROD = process.env.NODE_ENV === "production";

export const DB_NAME = process.env.DB_NAME || "";
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_HOST = process.env.DB_HOST || "";
export const DB_PORT = process.env.DB_PORT || "";

export const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || "";
export const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || "";
export const OAUTH_SCOPES = process.env.OAUTH_SCOPES || "";
export const OAUTH_URI = process.env.OAUTH_URI || "";
export const OAUTH_CALLBACK_URI = process.env.OAUTH_CALLBACK_URI || "";

export const API_URI = process.env.API_URI || "";

export const DATABASE_URL = process.env.DATABASE_URL || "";

export const COOKIE_MAX_AGE_DAY = Number(process.env.COOKIE_MAX_AGE_DAY || 1);
export const REFRESH_THRESHOLD_MINUTE = Number(
  process.env.REFRESH_THRESHOLD_MINUTE || 30,
);
