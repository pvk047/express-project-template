import Joi from 'joi'

const userDataRegistrationDataSchema = Joi.object().keys({
  first_name: Joi.string().required(),
  LastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
})

export default userDataRegistrationDataSchema
