'use strict'

import { redisClient } from '../../Server'

// GET
const redisGET = async key => await redisClient.get(key)
// SET
const redisSET = async (key, value) => await redisClient.set(key, value)
// SET With Expiry
const redisSETWithExpiry = async (key, value, REDIS_EXPIRY) => await redisClient.set(key, value, 'EX', REDIS_EXPIRY)
// SET With Expiry and check whether key exists in DB
const redisSETWithExistsAndExpiry = async (key, value, REDIS_EXPIRY) => await redisClient.set(key, value, 'NX', 'EX', REDIS_EXPIRY)

export const REDIS = { redisGET, redisSET, redisSETWithExpiry, redisSETWithExistsAndExpiry }
