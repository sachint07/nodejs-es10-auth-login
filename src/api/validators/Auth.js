'use strict'

import Joi from 'joi'

const JoiAuthHeaders = Joi.object({
  clientid: Joi.string().required(),
  appkey: Joi.string().optional()
})

export { JoiAuthHeaders }
