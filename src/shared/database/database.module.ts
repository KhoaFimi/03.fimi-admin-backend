import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PostgresConfigService } from '@/shared/database/services/postgres-config.service'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: PostgresConfigService
		})
	],
	providers: [PostgresConfigService]
})
export class DatabaseModule {}
