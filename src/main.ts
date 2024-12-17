import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from '@/app.module'
import { configSwagger } from '@/shared/configs/api-doc.config'
import { SystemConfigType } from '@/shared/configuration/types'
import { LoggerService } from '@/shared/logger/logger.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: '*',
			credentials: true
		}
	})

	const { port, apiPrefix, domain, nodeEnv, apiDocsPrefix } = app
		.get(ConfigService)
		.get<SystemConfigType>('system')

	const logger = app.get(LoggerService)

	app.use(cookieParser())

	app.setGlobalPrefix(apiPrefix)

	app.useGlobalPipes(new ValidationPipe())

	configSwagger(app, apiDocsPrefix)

	await app.listen(port)

	logger.info(`Server (${nodeEnv}) starting at: ${domain}/${apiPrefix}`)
	logger.info(`Api doc (${nodeEnv}) starting on: ${domain}/${apiDocsPrefix}`)
}
bootstrap()
