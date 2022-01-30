import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { join, dirname }  from 'path'
import Joi from 'joi'

const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: join(__dirname, '../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(1337),
    PAGE_ACCESS_TOKEN: Joi.string().required(),
    VERIFY_TOKEN: Joi.string().required(),
    FACEBOOK_GRAPH_API_URI: Joi.string().required(),
    TEXT_ACTIVATOR: Joi.string().required(),
    LOG_DIR: Joi.string().default('log'),
    LOG_FILE_NAME: Joi.string().default('log.log')
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    pageAccessToken: envVars.PAGE_ACCESS_TOKEN,
    verifyToken: envVars.VERIFY_TOKEN,
    facebookGraphApiUri: envVars.FACEBOOK_GRAPH_API_URI,
    textActivator: envVars.TEXT_ACTIVATOR,
    logDir: envVars.LOG_DIR,
    logFileName: envVars.LOG_FILE_NAME
}

export { config }