import dotenv from 'dotenv'

dotenv.config()

export default {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  version: process.env.VERSION || 'v1.0',
}
