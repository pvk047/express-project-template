import express from 'express'
import users from './users'

const router = express.Router()

router.get('/', (_, res, next) => {
  return res.send({
    success: true,
    message: 'Welcome to V1.0',
  })
})

router.use('/users', users)

export default router
