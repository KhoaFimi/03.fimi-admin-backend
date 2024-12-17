import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import {
	databaseConfigData,
	systemConfigData
} from '@/shared/configuration/configuration.data'
import { validate } from '@/shared/configuration/validate'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			cache: true,
			validate,
			envFilePath: ['.env', '.env.development'],
			load: [systemConfigData, databaseConfigData]
		})
	]
})
export class ConfigurationModule {}
