'use strict'

import { SERVER_CONFIG } from '../../config'
import { HttpClient } from '../../lib'

const { SLACK_URL } = SERVER_CONFIG

const notifySlack = (errObj = {}) => {
  const payload = `Auth: ${JSON.stringify(errObj)}`
  new HttpClient(SLACK_URL).post(payload)
}

export { notifySlack }
