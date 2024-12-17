import { HttpException, HttpStatus } from '@nestjs/common'
import { ZodError } from 'zod'

import { configSchema } from '@/shared/configuration/configuration.schema'

export const validate = (config: Record<string, unknown>) => {
	try {
		const validatedConfig = configSchema.safeParse(config)

		return validatedConfig.data
	} catch (error) {
		if (error instanceof ZodError) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_GATEWAY,
					message: 'Validate env config failed'
				},
				HttpStatus.BAD_GATEWAY,
				{
					cause: error
				}
			)
		}
	}
}
