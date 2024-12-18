import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'
import { QueryFailedError, Repository } from 'typeorm'

import { ERRORS_DICTIONARY } from '@/constraints/error-dictionary.constraint'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { User } from '@/modules/users/entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto) {
		try {
			let hashedPassword: string | null = null

			if (createUserDto.password) {
				hashedPassword = await argon2.hash(createUserDto.password)
			}

			const newUser = this.usersRepository.create({
				...createUserDto,
				password: hashedPassword,
				employeeId: `FIMI${createUserDto.phone.substring(3)}`
			})

			return await this.usersRepository.save(newUser)
		} catch (error) {
			console.log(error)

			if (error instanceof QueryFailedError) {
				if (error.driverError.code === '23505') {
					throw new BadRequestException({
						message: ERRORS_DICTIONARY.EMAIL_EXISTED,
						details: 'User is already existed'
					})
				}
			}
		}
	}

	findAll() {
		return `This action returns all users`
	}

	async findOneById(id: string) {
		try {
			return await this.usersRepository.findOneBy({ id })
		} catch (error) {
			if (error instanceof QueryFailedError) {
				if (error.driverError.code === '22P02') {
					throw new BadRequestException({
						message: ERRORS_DICTIONARY.USER_NOT_FOUND,
						details: 'User not found'
					})
				}
			}
		}
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		try {
			const updatedUser = await this.usersRepository
				.createQueryBuilder()
				.update(User)
				.set(updateUserDto)
				.where('id = :id', { id })
				.execute()

			return updatedUser.raw
		} catch (error) {
			console.log(error)
		}
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
