import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Response } from 'express'
import { map, Observable } from 'rxjs'

import { ResponseMessageKey } from '@/decorators/response-message.decorator'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp()

		const response = ctx.getResponse<Response>()

		const statusCode = response.statusCode

		const responseMessage =
			this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ?? ''

		return next.handle().pipe(
			map(data => ({
				statusCode,
				message: responseMessage,
				data: data
			}))
		)
	}
}
