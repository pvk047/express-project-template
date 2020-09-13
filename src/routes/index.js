import express from 'express'
import v1 from './v1'

const router = express.Router()

router.get('/', (_, res, next) => {
  return res.send({
    success: true,
    message: 'Hello,world',
  })
})

router.use('/v1', v1)

export default router
