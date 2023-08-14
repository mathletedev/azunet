import { password } from "bun";
import z from "zod";

import db from "../lib/db";
import { procedure, router } from "../lib/trpc";

export const userRouter = router({
	list: procedure.query(async () => {
		const res = await db.query("SELECT * FROM users;");
		return res.rows;
	}),
	getById: procedure.input(z.string()).query(async ({ input }) => {
		const res = await db.query("SELECT * FROM users WHERE id = $1;", [input]);
		return res.rows[0];
	}),
	create: procedure
		.input(
			z.object({
				username: z.string(),
				email: z.string(),
				password: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const hash = await password.hash(input.password);

			await db.query(
				"INSERT INTO users (username, email, password) VALUES ($1, $2, $3);",
				[input.username, input.email, hash]
			);
		}),
	login: procedure
		.input(z.object({ username: z.string(), password: z.string() }))
		.query(async ({ input }) => {
			const res = await db.query(
				"SELECT password FROM USERS WHERE username = $1;",
				[input.username]
			);

			const verified = await password.verify(
				input.password,
				res.rows[0].password
			);

			if (!verified) return "invalid password";
			return "logged in!";
		})
});
