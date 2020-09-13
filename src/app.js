import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'
import config from './config'
import mongoDBUtils from './utils/database/mongo'
const app = express()
app.use(logger('dev'))
app.use(cors())
app.use(helmet())

console.log(config.database.mongo.connection_string)

app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))

mongoDBUtils.connect()

app.use(routes)

app.use((_, res) => {
  return res.status(404).json({
    success: false,
    message: 'Requested Url/Resource is Not Found',
  })
})

app.use((err, req, res, next) => {
  const env = process.env.NODE_ENV || 'prod'
  const isDevEnv =
    env.toLowerCase() === 'dev' || env.toLowerCase() === 'development'

  const error = isDevEnv ? err : {}

  if (!err.errorCode) {
    console.trace(err)
  } else {
    console.error(err)
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Something Went Wrong.',
    error_code: error.errorCode || 'INTERNAL_SERVER_ERROR',
    status_code: error.statusCode || 500,
  })
})

process.on('unhandledRejection', async function (error) {
  console.error('[*] Server Stopped due to UnHandled Rejection :')
  console.trace(error)
  process.exit(1)
})

process.on('uncaughtException', async function (error) {
  console.error('[*] Server Stopped due to uncaughtException:')
  console.trace(error)
  process.exit(1)
})

module.exports = app
