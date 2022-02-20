'use strict'

import crypto from 'crypto'
import { ErrorObject } from '../lib'
import { REDIS_CONFIG } from '../config'

const { REDIS_JWT_SECRET } = REDIS_CONFIG

// Create JWT Token
const createToken = async claims => {
  const { clientid } = claims
  const secretKey = crypto.createHmac('sha256', clientid).update(REDIS_JWT_SECRET).digest('hex')
  const jwtToken = createJWT(claims, secretKey)
  const jwtSignature = jwtToken.split('.')[2]
  return { jwtToken, jwtSignature }
}

const decodeJWT = authorization => {
  const authToken = authorization && authorization.split('Bearer ')[1]

  if (!(authToken && authToken.length)) {
    throw new ErrorObject(401, 'Missing/Invalid Authorization in Request Header')
  }

  const jwtArray = authToken && authToken.split('.')

  if (jwtArray.length !== 3) throw new ErrorObject(401, 'Invalid JWT Token')

  let header = decodeBase64(jwtArray[0])
  let claims = decodeBase64(jwtArray[1])
  const signature = jwtArray[2]

  try {
    header = JSON.parse(header)
    claims = JSON.parse(claims)

    if (header.constructor.name !== 'Object' || claims.constructor.name !== 'Object') throw new ErrorObject(401, 'Invalid JWT Header/Claims')
  } catch (e) {
    throw new ErrorObject(401, 'Invalid JWT Token')
  }

  return signature
}

const createJWT = (claims, secret) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  let jwtHeader = encodeBase64(JSON.stringify(header))
  jwtHeader = urlEncode(jwtHeader)

  let jwtClaims = encodeBase64(JSON.stringify(claims))
  jwtClaims = urlEncode(jwtClaims)

  let jwtSignature = hmacSha256((jwtHeader + jwtClaims), secret)
  jwtSignature = urlEncode(jwtSignature)

  return [jwtHeader, jwtClaims, jwtSignature].join('.')
}

const hmacSha256 = (plainText = '', salt = '') => {
  const hmac = crypto.createHmac('sha256', salt)
  const hash = hmac.update(plainText, 'utf8').digest('base64')
  return hash
}

const encodeBase64 = (plainText = '') => Buffer.from(plainText).toString('base64')

const decodeBase64 = cipherText => Buffer.from(cipherText, 'base64').toString('utf8')

const urlEncode = encoded => encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

export const Aegis = { createToken, decodeJWT }
