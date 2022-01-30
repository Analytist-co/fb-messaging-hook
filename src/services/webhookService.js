import { config } from "../config"

const handleWebhook = (body, ) => {
  if (body.object === 'page') {
    body.entry.forEach((entry) => {

      let webhook_event = entry.messaging[0]

      if (webhook_event.message) {
        const sender_psid = webhook_event.sender.id

        logger.debug(`got message from ${sender_psid}: ${webhook_event.message.text}`)

        if (webhook_event.message.text === config.textActivator) {
          callGraphApi(sender_psid, webhook_event.message.text)
        }
      }
    })

    return { success: true }
  } else {
    return { success: false }
  }
}

export { handleWebhook }