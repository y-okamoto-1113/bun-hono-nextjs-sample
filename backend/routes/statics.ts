import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const staticRoute = new Hono()
  .get("*", serveStatic({ root: "../frontend/dist" }))
  .get("*", serveStatic({ path: "../frontend/dist/index.html" }));

export default staticRoute;
