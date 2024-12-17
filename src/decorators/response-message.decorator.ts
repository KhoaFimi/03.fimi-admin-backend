import { SetMetadata } from '@nestjs/common'

export const ResponseMessageKey = 'ResponseMessage'

export const ResponseMessage = (message: string) =>
	SetMetadata(ResponseMessageKey, message)
