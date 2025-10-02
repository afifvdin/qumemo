import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { cuid2 } from "drizzle-cuid2/postgres";

export const sessionsTable = pgTable("sessions", {
  id: cuid2("id").defaultRandom().primaryKey(),
  accessToken: text("access_token").notNull(),
  expiresIn: integer("expires_in").notNull(),
  scope: varchar({ length: 255 }).notNull(),
  tokenType: varchar({ length: 255 }).notNull(),
});
