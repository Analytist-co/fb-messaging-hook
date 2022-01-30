import winston from 'winston'
import fs from 'fs'
import { config } from './config.js'
import 'winston-daily-rotate-file'

// create log dir if not exist
(!fs.existsSync(config.logDir)) && fs.mkdirSync(config.logDir)

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

const rotateFileTransport = new winston.transports.DailyRotateFile({
  dirname: config.logDir,
  filename: config.logFileName,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d'
})

const consoleTransport = new winston.transports.Console({
  stderrLevels: ['error'],
})

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',

  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    rotateFileTransport,
    consoleTransport
  ]
})

export { logger }