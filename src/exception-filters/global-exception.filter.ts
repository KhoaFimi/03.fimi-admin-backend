import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Inject
} from '@nestjs/common'
import { Response } from 'express'

import { systemConfigData } from '@/shared/configuration/configuration.data'
import { SystemConfigType } from '@/shared/configuration/types'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	constructor(
		@Inject(systemConfigData.KEY)
		private readonly systemConfig: SystemConfigType
	) {}

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()

		const response = ctx.getResponse<Response>()

		const status =
			exception instanceof HttpException ? exception.getStatus() : 500

		const message =
			exception instanceof HttpException
				? exception.message
				: 'Internal server error'

		response.status(status).json({
			statusCode: status,
			message,
			error: this.systemConfig.isDev
				? {
						response: exception.response,
						stack: exception.stack
					}
				: {
						response: exception.response
					}
		})
	}
}
