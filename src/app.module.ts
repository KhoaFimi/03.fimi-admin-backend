import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { AppController } from '@/app.controller'
import { GlobalExceptionFilter } from '@/exception-filters/global-exception.filter'
import { ResponseInterceptor } from '@/interceptors/response.interceptor'
import { HttpLoggingMiddleware } from '@/middlewares/http-logging.middleware'
import { AuthModule } from '@/modules/auth/auth.module'
import { UsersModule } from '@/modules/users/users.module'
import { ConfigurationModule } from '@/shared/configuration/configuration.module'
import { DatabaseModule } from '@/shared/database/database.module'
import { LoggerModule } from '@/shared/logger/logger.module'

@Module({
	imports: [
		ConfigurationModule,
		LoggerModule,
		UsersModule,
		DatabaseModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionFilter
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor
		}
	]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HttpLoggingMiddleware).forRoutes('*')
	}
}
