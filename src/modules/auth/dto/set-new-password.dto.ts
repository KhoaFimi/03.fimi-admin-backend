import { IsStrongPassword } from 'class-validator'

export class SetNewPasswordDto {
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 0
	})
	password: string
}
