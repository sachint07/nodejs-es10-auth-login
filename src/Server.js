'use strict'

import { MongoClient } from 'mongodb'
import Redis from 'ioredis'
import { notifySlack } from './api/helpers'
import { SERVER_CONFIG, MONGO_CONFIG, REDIS_CONFIG } from './config'
// const { MongoClient } = require('mongodb')

const { PORT } = SERVER_CONFIG
const { CONNECTION_URI, MONGO_DBNAME } = MONGO_CONFIG
const { REDIS_HOST, REDIS_PORT } = REDIS_CONFIG

export let redisClient
export let mongoClientDB

const Server = async App => {
  try {
    console.log('[Info] Connecting to MongoDB...')
    const mongoClientUse = new MongoClient(CONNECTION_URI)
    await mongoClientUse.connect()
    mongoClientDB = mongoClientUse.db(MONGO_DBNAME)
    console.log(`[Info] MongoDB Connection to Database ' ${MONGO_DBNAME} ' Successful!`)
    console.log('[Info] Connecting to Redis...')
    redisClient = new Redis(REDIS_HOST, REDIS_PORT)
    console.log(`[Info] RedisDB Connection to Database ${REDIS_PORT} Successful!`)

    await App.listen(PORT)
    console.log(`[Info] Server Started Successfully! Listening on Port: ${PORT}`)
  } catch (error) {
    console.log(error)
    notifySlack(error)
    throw error
  }
}

export default Server
