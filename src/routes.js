import express from 'express'
import * as facebookController from './controllers/facebookController.js'
import bodyParser from 'body-parser'

const router = express.Router()
const jsonParser = bodyParser.json()

router.get('/webhook', facebookController.webhookRegistration)
router.post('/webhook', jsonParser, facebookController.webhook)
router.post('/send', jsonParser, facebookController.sendMessage)
router.get('/test', facebookController.test)

export { router as routes }