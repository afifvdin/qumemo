import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "@/lib/constant";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
);
