// Hono
import { Hono } from "hono";

// Routes
import proverbios from "./proverbios";

// ----------------------------

const app = new Hono();
app.route("/proverbios", proverbios);

export default app;
