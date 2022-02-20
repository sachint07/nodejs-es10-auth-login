'use strict'

import { AuthModel } from '../models'
import { ResponseBody } from '../../lib'

// Destructing Functions
const { createAuth, verifyAuth } = AuthModel

const create = async (request, response, next) => {
  const { headers } = request

  const result = await createAuth(headers)

  const responseBody = new ResponseBody(200, 'Success', result)
  response.body = responseBody

  next()
}

const verify = async (request, response, next) => {
  const { headers } = request

  const result = await verifyAuth(headers)

  const responseBody = new ResponseBody(200, 'Success', result)
  response.body = responseBody

  next()
}

// Controller to redirect the operation
export const AuthController = { create, verify }
