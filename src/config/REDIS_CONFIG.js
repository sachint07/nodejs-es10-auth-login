'use strict'

// Redis Configuration to required establish connection
const { REDIS_HOST, REDIS_OTP_EXPIRY, REDIS_JWT_EXPIRY, REDIS_JWT_SECRET, REDIS_PORT, REDIS_SECRET_KEY } = process.env

const REDIS_CONFIG = { REDIS_HOST, REDIS_OTP_EXPIRY, REDIS_JWT_EXPIRY, REDIS_JWT_SECRET, REDIS_PORT, REDIS_SECRET_KEY }

// Terminate Server if any Cache Configuration is missing
Object.keys(REDIS_CONFIG).forEach((key) => {
  if (!REDIS_CONFIG[key]) {
    console.error('[Error] Missing Redis Config:', key)
    return process.exit(1)
  }
})

export { REDIS_CONFIG }
