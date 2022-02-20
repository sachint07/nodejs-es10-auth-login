'use strict'

import Joi from 'joi'

const JoiOTPHeaders = Joi.object({
  mobileno: Joi.string().required(),
  clientid: Joi.string().required(),
  appkey: Joi.string().optional()
})

export { JoiOTPHeaders }
