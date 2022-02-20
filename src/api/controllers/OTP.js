'use strict'

import { OTPModel } from '../models'
import { ResponseBody } from '../../lib'

// Destructing Functions
const { createOTP } = OTPModel

const create = async (request, response, next) => {
  const { headers } = request

  const result = await createOTP(headers)

  const responseBody = new ResponseBody(200, 'Success', { otp: result })
  response.body = responseBody

  next()
}

// Controller to redirect the operation
export const OTPController = { create }
