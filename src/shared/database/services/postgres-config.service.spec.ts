import { Test, TestingModule } from '@nestjs/testing'

import { PostgresConfigService } from './postgres-config.service'

describe('PostgresConfigService', () => {
	let service: PostgresConfigService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PostgresConfigService]
		}).compile()

		service = module.get<PostgresConfigService>(PostgresConfigService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
