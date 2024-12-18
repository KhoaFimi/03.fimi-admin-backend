import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Department } from '@/modules/users/entities/department.entity'
import { Team } from '@/modules/users/entities/team.entity'
import { User } from '@/modules/users/entities/user.entity'
import { UsersController } from '@/modules/users/users.controller'
import { UsersService } from '@/modules/users/users.service'

@Module({
	imports: [TypeOrmModule.forFeature([User, Department, Team])],
	exports: [TypeOrmModule],
	controllers: [UsersController],
	providers: [UsersService]
})
export class UsersModule {}
