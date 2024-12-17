import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ResponseMessage } from '@/decorators/response-message.decorator'

@ApiTags('Apps')
@Controller()
export class AppController {
	@Get()
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Say hello successfully')
	sayHello() {
		return `Hello world`
	}
}
