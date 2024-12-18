import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
	IsStrongPassword,
	MaxLength
} from 'class-validator'

import { UserTitleEnum } from '@/enums/user.enum'

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	fullName: string

	@ApiProperty()
	@IsNotEmpty()
	@MaxLength(64)
	@IsEmail()
	email: string

	@ApiProperty()
	@IsNotEmpty()
	@IsPhoneNumber('VN')
	phone: string

	@ApiProperty()
	@IsOptional()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 0
	})
	password: string

	@ApiProperty()
	@IsOptional()
	@IsEnum(UserTitleEnum)
	userTitle: UserTitleEnum
}
