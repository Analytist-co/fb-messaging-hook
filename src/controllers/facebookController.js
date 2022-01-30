import 'dotenv/config.js'
import { config } from '../config.js'
import { logger } from '../logger.js'
import { callGraphApi } from '../services/messengerService.js'
import { handleWebhook } from '../services/webhookService.js'

const webhookRegistration = async (req, res) => {
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']
  
  logger.info(`attempt to register Facebook messenger webhooks, token: ${token}`)

  // Check if a token and mode were sent
  if (mode && token) {
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === config.verifyToken) {
      
      // Respond with 200 OK and challenge token from the request
      logger.info('registered Facebook messenger webhooks successfully')
      res.status(200).send(challenge)
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403) 
    }
  }
}

const webhook = async (req, res) => {

  // Parse the request body from the POST
  let body = req.body

  if (handleWebhook(body).success) {
    res.status(200).send('EVENT_RECEIVED')
  } else { // event is not from a page subscription
    res.sendStatus(404)
  }
}

const test = async (req, res) => {
  try {
    logger.info('/test reached')

    res.setHeader('Content-type', 'application/json')
    res.json({ test: true })
  } catch (error) {
    res.json({ error, message: `Something went wrong on ${req.route.path}` })
  }
}

const sendMessage = async (req, res) => {
  let body = req.body

  try {
    callGraphApi(body.psid, body.text )
    res.json({ success: true })
  } catch (error){
    res.json({ error, message: `Cannot call Facebook Graph Api`})
  }
}

export {
  webhookRegistration,
  webhook,
  sendMessage,
  test
}