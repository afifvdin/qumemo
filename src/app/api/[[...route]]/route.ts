import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authRoutes } from "./routes/auth";
import { contentRoutes } from "./routes/content";

const app = new Hono().basePath("/api");

app.route("/auth", authRoutes);
app.route("/content", contentRoutes);
app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

export const GET = handle(app);
export const POST = handle(app);
