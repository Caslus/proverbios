// Hono
import { Hono } from "hono";

// Routes
import v1 from "./routes/v1";

// ----------------------------

const app = new Hono();
app.route("api/v1", v1);

export default app;
