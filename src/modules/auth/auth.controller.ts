import { Body, Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from '@/modules/auth/auth.service'
import { SetNewPasswordDto } from '@/modules/auth/dto/set-new-password.dto'

@ApiTags('auths')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/:id')
	async getUser(
		@Param('id') id: string,
		@Body() setNewPasswordDto: SetNewPasswordDto
	) {
		return this.authService.setNewPassword(id, setNewPasswordDto)
	}
}
