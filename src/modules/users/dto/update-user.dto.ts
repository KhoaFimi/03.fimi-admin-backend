import { OmitType, PartialType } from '@nestjs/swagger'

import { User } from '@/modules/users/entities/user.entity'

export class UpdateUserDto extends PartialType(OmitType(User, ['password'])) {}
