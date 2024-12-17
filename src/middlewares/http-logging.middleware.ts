import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

import { LoggerService } from '@/shared/logger/logger.service'

@Injectable()
export class HttpLoggingMiddleware implements NestMiddleware {
	constructor(private readonly logger: LoggerService) {}

	use(req: Request, res: Response, next: NextFunction) {
		const { method, query: queryPrams, baseUrl: path } = req

		setImmediate(async () => {
			const requestLog = {
				method,
				path,
				queryPrams,
				body: req.body
			}

			this.logger.http(`Request: ${JSON.stringify(requestLog)}`)
		})

		let body = {}
		const chunks = []
		const oldEnd = res.end

		res.end = chunk => {
			if (chunk) {
				chunks.push(Buffer.from(chunk))
			}

			body = Buffer.concat(chunks).toString('utf8')
			return oldEnd.call(res, body)
		}

		res.on('finish', async () => {
			return setTimeout(() => {
				const responseLog = { method, path, statusCode: res.statusCode, body }

				this.logger.http(`Response: ${JSON.stringify(responseLog)}`)
			}, 0)
		})

		next()
	}
}
