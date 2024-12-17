import { z } from 'zod'

export const configSchema = z.object({
	NODE_ENV: z
		.union([
			z.literal('development'),
			z.literal('testing'),
			z.literal('production')
		])
		.default('development'),
	PORT: z.string(),
	HOST: z.string(),
	DOMAIN: z.string().default('http://localhost:8080'),
	API_PREFIX: z.string(),
	API_DOCS_PREFIX: z.string(),
	DATABASE_URL: z.string(),
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_DB: z.string(),
	POSTGRES_HOST: z.string(),
	POSTGRES_PORT: z.string()
})
