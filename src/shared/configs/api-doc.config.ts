import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const configSwagger = (app: INestApplication, apiDocPath: string) => {
	const config = new DocumentBuilder()
		.setTitle('Fimi admin backend')
		.setDescription('## Fimi admin backend doc serve to Fimi admin web app')
		.setVersion('1.0')
		.build()

	console.log(apiDocPath)

	const docuement = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup(apiDocPath, app, docuement)
}
