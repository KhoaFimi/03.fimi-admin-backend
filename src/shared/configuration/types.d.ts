import { ConfigType } from '@nestjs/config'
import { z } from 'zod'

import {
	databaseConfigData,
	systemConfigData
} from '@/shared/configuration/configuration.data'
import { configSchema } from '@/shared/configuration/configuration.schema'

type ConfigSchema = z.infer<typeof configSchema>

declare global {
	namespace NodeJS {
		interface ProcessEnv extends ConfigSchema {}
	}
}

type SystemConfigType = ConfigType<typeof systemConfigData>
type DatabaseConfigType = ConfigType<typeof databaseConfigData>
