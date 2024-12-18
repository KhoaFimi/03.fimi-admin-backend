import { Inject, Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

import {
	databaseConfigData,
	systemConfigData
} from '@/shared/configuration/configuration.data'
import {
	DatabaseConfigType,
	SystemConfigType
} from '@/shared/configuration/types'

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
	constructor(
		@Inject(databaseConfigData.KEY)
		private readonly databaseConfig: DatabaseConfigType,
		@Inject(systemConfigData.KEY)
		private readonly systemConfig: SystemConfigType
	) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: this.databaseConfig.postgresHost,
			port: this.databaseConfig.postgresPort,
			username: this.databaseConfig.postgresUser,
			password: this.databaseConfig.postgresPassword,
			database: this.databaseConfig.postgresDb,
			entities: ['dist/**/**/*.entity.{ts,js}'],
			synchronize: this.systemConfig.isDev
		}
	}
}
