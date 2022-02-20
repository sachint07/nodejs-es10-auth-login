'use strict'

const {
  MONGO_DBNAME
  // MONGO_HOST,
  // MONGO_PORT,
  // MONGO_USERNAME,
  // MONGO_URL,
  // MONGO_PASSWORD,
  // MONGO_AUTH_SOURCE,
  // MONGO_AUTH_MECHANISM
} = process.env

const OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}

// MONGO Connection URI
// const CONNECTION_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}?retryWrites=true&writeConcern=majority`
const CONNECTION_URI = 'mongodb://localhost:27017/auth'

const MONGO_CONFIG = {
  MONGO_DBNAME,
  // MONGO_HOST: MONGO_HOST,
  // PORT: MONGO_PORT,
  OPTIONS,
  CONNECTION_URI
}

const checkDbKeys = config => {
  Object.keys(config).forEach((key) => {
    if (!config[key]) {
      console.error('[Error] Missing MongoDB Config:', key)
      return process.exit(1)
    }
  })
}

// Terminate Server if any, DB Configuration is missing
checkDbKeys(MONGO_CONFIG)

export { MONGO_CONFIG }
