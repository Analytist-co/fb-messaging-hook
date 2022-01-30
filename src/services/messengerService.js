import { config } from '../config.js'
import request from 'request';
import { logger } from '../logger.js';

const getFacebookGraphRequest = (body) => ({
  "uri": config.facebookGraphApiUri,
  "qs": { "access_token": config.pageAccessToken },
  "method": "POST",
  "json": body
})

const callGraphApi = (sender_psid, response) => {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": {
      "text": `${response}`
    }
  }

  request(getFacebookGraphRequest(request_body), (err, res, body) => {
    if (!err) {
      logger.debug('message sent!')
    } else {
      logger.error("Unable to send message:" + err);
    }
  });
}
export { callGraphApi }