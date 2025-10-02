import { eq } from "drizzle-orm";
import { db } from "./db";
import { sessionsTable } from "./schema";
import { TokenInsert } from "@/types/auth";

export async function getSession(id: string) {
  try {
    const session = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id))
      .limit(1);
    return session[0];
  } catch (error) {
    return null;
  }
}

export async function createSession(token: TokenInsert, date: Date) {
  try {
    const session = await db
      .insert(sessionsTable)
      .values({
        accessToken: token.access_token,
        expiresIn: token.expires_in,
        scope: token.scope,
        tokenType: token.token_type,
      })
      .returning({ id: sessionsTable.id });
    return session[0];
  } catch (error) {
    throw new Error("Cannot create session");
  }
}
