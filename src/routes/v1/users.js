import express from 'express'

import { signUp } from '../../controllers/userController'
import SchemaValidator from '../../validations/schemaValidator'

const router = express.Router()

const validate = SchemaValidator(true)

router.post('/sign-up', validate, signUp)

export default router
