// Hono
import { Hono } from "hono";

// Kysely
import { db } from "../../db/index";
import { sql } from "kysely";

// Interfaces
import { Count } from "../../interfaces/database";

// ----------------------------

const app = new Hono();

app.get("/", async (c) => {
	const result = await db
		.selectFrom("proverbios")
		.selectAll()
		.orderBy(sql`random()`)
		.limit(1)
		.execute();
	return c.json(result);
});

app.get("/quantidade", async (c) => {
	const result = await sql<Count>`SELECT COUNT(*) FROM proverbios`.execute(db);
	return c.json({ quantidade: Number(result.rows[0].count) });
});

app.get("/:id", async (c) => {
	const id = Number(c.req.param("id"));

	if (id === undefined) {
		return c.json({ error: "id é obrigatório" }, { status: 400 });
	}

	if (isNaN(Number(id))) {
		return c.json({ error: "id inválido" }, { status: 400 });
	}

	if (id < 1) {
		return c.json({ error: "o id precisa ser maior que 0" }, { status: 400 });
	}

	const result = await db.selectFrom("proverbios").selectAll().where("id", "=", Number(id)).execute();

	if (result.length === 0) {
		return c.json({ error: "provérbio não encontrado" }, { status: 404 });
	}

	return c.json(result);
});

export default app;
