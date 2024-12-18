import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { User } from '@/modules/users/entities/user.entity'
import { UsersService } from '@/modules/users/users.service'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	exports: [TypeOrmModule],
	controllers: [AuthController],
	providers: [AuthService, UsersService]
})
export class AuthModule {}
