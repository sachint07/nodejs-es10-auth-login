'use strict'

import { JoiAuthHeaders, JoiOTPHeaders } from '../validators'
import { joiValidate } from '../../lib'

// Validate Auth Headers
const checkAuthHeaders = (request, response, next) => {
  const { headers } = request
  const { clientid } = headers
  return joiValidate({ clientid }, JoiAuthHeaders, next)
}

// Validate OTP Headers
const checkOTPHeaders = (request, response, next) => {
  const { headers } = request
  const { clientid, mobileno } = headers

  return joiValidate({ clientid, mobileno }, JoiOTPHeaders, next)
}

export const Header = { checkAuthHeaders, checkOTPHeaders }
