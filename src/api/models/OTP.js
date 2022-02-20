'use strict'

import { ErrorObject } from '../../lib'
import { REDIS_CONFIG, SERVER_CONFIG } from '../../config'
import { generateOTP } from '../helpers'
import { MONGO_MODEL, REDIS } from '../models'

const { REDIS_OTP_EXPIRY } = REDIS_CONFIG
const { COUTRY_CODE } = SERVER_CONFIG

// OTP Operations
const handleOTP = async mobileNo => {
  const otpAlreadyExists = await REDIS.redisGET(mobileNo)
  if (otpAlreadyExists === null) {
    const OTP = generateOTP()
    const result = await REDIS.redisSETWithExpiry(mobileNo, OTP, REDIS_OTP_EXPIRY)
    if (result === 'OK') return OTP
  } else return otpAlreadyExists
  throw new ErrorObject(503, 'Service Unavailable')
}

// Create Token mecha
const createOTP = async headers => {
  const { appKey = '', mobileno } = headers
  const mobileNo = `${COUTRY_CODE}${mobileno}`
  const result = await MONGO_MODEL.mongoFindOne('customer', { mobileNo })
  if (result !== null) {
    const { mobileNo: mongoMobileNo } = result
    if (mongoMobileNo === mobileNo) return await handleOTP(mobileNo)
  }
  throw new ErrorObject(404, 'Mobile Number Does Not Exist')
}

// OTP Model Fuctions being exposed
export const OTPModel = { createOTP }
