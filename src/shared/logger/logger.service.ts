import 'winston-daily-rotate-file'

import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import * as path from 'path'
import * as winston from 'winston'

import { systemConfigData } from '@/shared/configuration/configuration.data'

const customLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3,
		verbose: 4,
		input: 5,
		silly: 6,
		data: 7,
		help: 8,
		http: 9,
		prompt: 10,
		emerg: 11,
		alert: 12,
		crit: 13,
		notice: 14
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		info: 'green',
		debug: 'blue',
		verbose: 'cyan',
		input: 'grey',
		silly: 'pink',
		data: 'white',
		http: 'magenta',
		help: 'cyan',
		prompt: 'grey',
		emerg: 'red',
		alert: 'yellow',
		crit: 'red',
		notice: 'blue'
	}
}

@Injectable()
export class LoggerService {
	private readonly logger: winston.Logger

	constructor(
		@Inject(systemConfigData.KEY)
		private readonly systemConfig: ConfigType<typeof systemConfigData>
	) {
		const logDir = path.join(process.cwd(), 'logs')

		this.logger = winston.createLogger({
			level: 'notice',
			levels: customLevels.levels,
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.colorize({ all: true, colors: customLevels.colors }),
				winston.format.printf(({ timestamp, level, message }) => {
					return `${timestamp} [${level}]: ${message}`
				})
			),
			transports: [
				new winston.transports.DailyRotateFile({
					level: 'data',
					filename: 'data-%DATE%.log',
					dirname: `${logDir}/data`,
					format: winston.format.uncolorize(),
					zippedArchive: true,
					datePattern: 'YYYY-MM-DD',
					maxFiles: '20d',
					maxSize: '30m'
				}),
				new winston.transports.DailyRotateFile({
					level: 'error',
					filename: 'error-%DATE%.log',
					dirname: `${logDir}/error`,
					format: winston.format.uncolorize(),
					zippedArchive: true,
					datePattern: 'YYYY-MM-DD',
					maxFiles: '20d',
					maxSize: '30m'
				})
			]
		})

		if (this.systemConfig.isDev) {
			this.logger.add(new winston.transports.Console())
			this.logger.add(
				new winston.transports.DailyRotateFile({
					level: 'http',
					filename: 'http-%DATE%.log',
					dirname: `${logDir}/http`,
					format: winston.format.uncolorize(),
					zippedArchive: true,
					datePattern: 'YYYY-MM-DD',
					maxFiles: '20d',
					maxSize: '30m'
				})
			)
		}
	}

	error(message: string, trace?: string) {
		this.logger.error(trace ? `${message} - ${trace}` : message)
	}

	warn(message: string) {
		this.logger.warn(message)
	}

	help(message: string) {
		this.logger.help(message)
	}

	data(message: string) {
		this.logger.data(message)
	}

	info(message: string) {
		this.logger.info(message)
	}

	debug(message: string) {
		this.logger.debug(message)
	}

	prompt(message: string) {
		this.logger.prompt(message)
	}

	verbose(message: string) {
		this.logger.verbose(message)
	}

	http(message: string) {
		this.logger.http(message)
	}

	silly(message: string) {
		this.logger.silly(message)
	}

	input(message: string) {
		this.logger.input(message)
	}

	// for syslog levels only
	alert(message: string) {
		this.logger.alert(message)
	}

	crit(message: string) {
		this.logger.crit(message)
	}

	notice(message: string) {
		this.logger.notice(message)
	}

	emerg(message: string) {
		this.logger.emerg(message)
	}
}
