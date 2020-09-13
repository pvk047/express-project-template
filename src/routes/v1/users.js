import express from 'express'

import { signUp } from '../../controllers/userController'
import { isUserExistsWithGivenEmail } from '../../middlewares/userMiddleWare'
import SchemaValidator from '../../validations/schemaValidator'

const router = express.Router()

const validate = SchemaValidator(true)

router.post('/sign-up', validate, isUserExistsWithGivenEmail, signUp)

export default router
