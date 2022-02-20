'use strict'

import { REDIS_CONFIG } from '../../config'
import { Aegis, ErrorObject } from '../../lib'
import { REDIS } from '../models'

const { REDIS_JWT_EXPIRY } = REDIS_CONFIG
const { createToken, decodeJWT } = Aegis

// Create Token mecha
const createAuth = async headers => {
  const { appKey = '', clientid } = headers
  const claims = { appKey, clientid, date: new Date().getTime() }
  const { jwtToken, jwtSignature } = await createToken(claims)
  await REDIS.redisSETWithExistsAndExpiry(`ID-${clientid}`, jwtSignature, REDIS_JWT_EXPIRY)
  return { jwtToken }
}

// Verify Token mecha
const verifyAuth = async headers => {
  const { clientid, authorization } = headers
  const jwtSignature = decodeJWT(authorization)
  const value = await REDIS.redisGET(`ID-${clientid}`)
  if (value === jwtSignature) { return }

  throw new ErrorObject(401, 'Unauthorized: Invalid Token')
}

// Auth Model Fuctions being exposed
export const AuthModel = { createAuth, verifyAuth }
