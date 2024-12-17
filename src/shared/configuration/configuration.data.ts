import { registerAs } from '@nestjs/config'

export const systemConfigData = registerAs('system', () => ({
	nodeEnv: process.env.NODE_ENV,
	isDev: process.env.NODE_ENV === 'development',
	isProd: process.env.NODE_ENV === 'production',
	isTestig: process.env.NODE_ENV === 'testing',
	port: parseInt(process.env.PORT),
	host: process.env.HOST,
	domain:
		process.env.DOMAIN ?? `http://${process.env.HOST}:${process.env.PORT}`,
	apiPrefix: process.env.API_PREFIX,
	apiDocsPrefix: process.env.API_DOCS_PREFIX
}))

export const databaseConfigData = registerAs('database', () => ({
	databaseUrl: process.env.DATABASE_URL,
	postgresUser: process.env.POSTGRES_USER,
	postgresPassword: process.env.POSTGRES_PASSWORD,
	postgresPort: process.env.POSTGRES_PORT,
	postgresHost: process.env.POSTGRES_HOST,
	postgresDb: process.env.POSTGRES_DB
}))
