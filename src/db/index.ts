// Kysely
import { Kysely, PostgresDialect } from "kysely";

// Postgres
import { Pool } from "pg";

// Interfaces
import { Database } from "../interfaces/database";

// ----------------------------

export const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool: new Pool({
			host: Bun.env.DB_HOST,
			user: Bun.env.DB_USER,
			password: Bun.env.DB_PASSWORD,
			database: Bun.env.DB_NAME,
		}),
	}),
});
