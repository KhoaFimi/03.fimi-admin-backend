import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	SerializeOptions,
	UseInterceptors
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ResponseMessage } from '@/decorators/response-message.decorator'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { User } from '@/modules/users/entities/user.entity'
import { UsersService } from '@/modules/users/users.service'

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({
		summary: 'Create new user',
		description: 'Required user have userTitile greater then 1'
	})
	@UseInterceptors(ClassSerializerInterceptor)
	@SerializeOptions({ type: User })
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Create user successfully')
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@ApiOperation({
		summary: 'Get user by id'
	})
	@UseInterceptors(ClassSerializerInterceptor)
	@SerializeOptions({ type: User })
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Get user successfully')
	@Get(':id')
	findOneById(@Param('id') id: string) {
		return this.usersService.findOneById(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id)
	}
}
