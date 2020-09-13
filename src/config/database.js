import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV

function getMongoDBConnectionStringByEnv(env) {
  switch (env) {
    case 'dev':
      return process.env.DEV_MONGO_DB_CONNECTION_STRING
    case 'prod':
      return process.env.PROD_MONGO_DB_CONNECTION_STRING
    case 'test':
      return process.env.TEST_MONGO_DB_CONNECTION_STRING
    default:
      return process.env.TEST_MONGO_DB_CONNECTION_STRING
  }
}

export default {
  mongo: {
    connection_string: getMongoDBConnectionStringByEnv(env),
  },
}
