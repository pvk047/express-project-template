const stringErrorHandler = (errors, label = null) => {
  errors.forEach((err) => {
    const key = label || err.context.label || err.context.key || err.path

    switch (err.type) {
      case 'any.empty':
        err.context.error_code = 'FIELD_REQUIRED'
        err.message = `"${key}" is Required!`
        break
      case 'any.required':
        err.context.error_code = 'FIELD_REQUIRED'
        err.message = `"${key}" is Required!`
        break
      case 'string.base':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `Invalid value of "${key}"`
        break
      case 'string.regex.base':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `Invalid value of "${key}"`
        err.type = 'string.InvalidFormat'
        break
      case 'string.min':
        err.context.error_code = 'VALUE_DO_NOT_HAVE_MIN_CHAR'
        err.message = `"${key}" should contain At Least ${
          err.context.limit || 1
        } Characters.`
        break
      case 'string.max':
        err.context.error_code = 'VALUE_HAVE_MAX_CHAR'
        err.message = `"${key}" Should Not Contain More than ${
          err.context.limit || 1
        } Characters.`
        break
      default:
        err.context.error_code = 'INVALID_VALUE'
        break
    }
  })
  return errors
}

const numberErrorHandler = (errors, label = null) => {
  errors.forEach((err) => {
    const key = label || err.context.label || err.context.key || err.path
    switch (err.type) {
      case 'any.empty':
        err.context.error_code = 'FIELD_REQUIRED'
        err.message = `"${key}" is Required!`
        break
      case 'any.required':
        err.context.error_code = 'FIELD_REQUIRED'
        err.message = `"${key}" is Required!`
        break
      case 'number.base':
        err.context.error_code = 'VALUE_SHOULD_BE_NUMBER'
        err.message = `${key} should be a valid Number.`
        break
      case 'number.integer':
        err.context.error_code = 'VALUE_SHOULD_BE_NUMBER'
        err.message = `${key} should be a valid Integer.`
        break
      case 'number.infinity':
        err.context.error_code = 'VALUE_SHOULD_BE_FINITE'
        err.message = `.${key} should be a finite Number.`
        break
      case 'number.greater':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `${key} should be greater than ${err.context.limit}`
        break
      case 'number.less':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `${key} should be less than ${err.context.limit}`
        break
      case 'number.max':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `${key} should be less than or equal to ${err.context.limit}`
        break
      case 'number.min':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `${key} should be greater than or equal to ${err.context.limit}`
        break
      case 'number.multiple':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `${key} should be multiple of ${err.context.multiple}`
        break
      case 'number.precision':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `${key} should have ${err.context.limit} precision.`
        break
      case 'number.negative':
        err.context.error_code = 'VALUE_SHOULD_BE_NEGATIVE'
        err.message = `${key} should be a Negative Number.`
        break
      case 'number.positive':
        err.context.error_code = 'VALUE_SHOULD_BE_POSITIVE'
        err.message = `${key} should be a Positive Number.`
        break
      case 'number.port':
        err.context.error_code = 'VALUE_SHOULD_BE_A_PORT'
        err.message = `${key} should be a port number.`
        break
      case 'number.unsafe':
        err.context.error_code = 'VALUE_SHOULD_BE_A_SAFE_NUMBER'
        err.message = `${key} is not within the safe range of JavaScript numbers.`
        break
      default:
        break
    }
  })
  return errors
}

const arrayErrorHandler = (errors) => {
  errors.forEach((err) => {
    const { label } = err.context || {}
    const key = label || err.context.key || err.path

    switch (err.type) {
      case 'any.empty':
        err.context.error_code = 'FIELD_REQUIRED'
        err.message = `"${key}" is Required!`
        break
      case 'any.required':
        err.context.error_code = 'FIELD_REQUIRED'
        err.message = `"${key}" is Required!`
        break
      case 'array.base':
        err.context.error_code = 'VALUE_SHOULD_BE_ARRAY'
        err.message = `Invalid value of "${key}"`
        break
      case 'array.max':
        err.context.error_code = 'VALUE_EXCEEDS_MAX_NO_OF_ITEMS'
        err.message = `Invalid value of "${key}"`
        break
      case 'array.min':
        err.context.error_code = 'VALUE_DO_NOT_HAVE_MIN_NO_OF_ITEMS'
        err.message = `Invalid value of "${key}"`
        break
      default:
        err.context.error_code = 'INVALID_VALUE'
        break
    }
  })
  return errors
}

const dateErrorHandler = (errors) => {
  errors.forEach((err) => {
    const { label } = err.context || {}
    const key = label || err.context.key || err.path

    switch (err.type) {
      case 'any.empty':
        err.context.error_code = 'FIELD_REQUIRED'
        err.message = `"${key}" is Required!`
        break
      case 'any.required':
        err.context.error_code = 'FIELD_REQUIRED'
        err.message = `"${key}" is Required!`
        break
      case 'date.base':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `Invalid value of "${key}"`
        break
      case 'date.strict':
        err.context.error_code = 'INVALID_VALUE'
        err.message = `Invalid value of "${key}"`
        break
      case 'date.greater':
        err.context.error_code = 'VALUE_SHOULD_BE_GREATER'
        err.message = `Invalid value of "${key}"`
        break
      case 'date.max':
        err.context.error_code = 'VALUE_SHOULD_BE_MIN'
        err.message = `Invalid value of "${key}"`
        break
      case 'date.less':
        err.context.error_code = 'VALUE_SHOULD_BE_LESSER'
        err.message = `Invalid value of "${key}"`
        break
      case 'date.min':
        err.context.error_code = 'VALUE_SHOULD_BE_MAX'
        err.message = `Invalid value of "${key}"`
        break
      case 'date.format':
        err.context.error_code = 'INVALID_DATE_FORMAT'
        err.message = `Invalid value of "${key}"`
        break

      default:
        err.context.error_code = 'INVALID_VALUE'
        break
    }
  })
  return errors
}

function objectId(Joi) {
  if (!(Joi && Joi.isJoi)) {
    throw new Error('Joi Object Must be passed')
  }
  return function objectId() {
    const ObjectIdPattern = /^[0-9a-fA-F]{24}$/
    return Joi.string().regex(ObjectIdPattern)
  }
}

function time(Joi) {
  if (!(Joi && Joi.isJoi)) {
    throw new Error('Joi Object Must be passed')
  }
  return function time() {
    const timeRegex = /^([0-1]\d|2[0-3])?[0-3]\d?:[0-5]\d$/
    return Joi.string().regex(timeRegex)
  }
}

function timeWithSeconds(Joi) {
  if (!(Joi && Joi.isJoi)) {
    throw new Error('Joi Object Must be passed')
  }
  return function timeWithSeconds() {
    const timeRegex = /^([0-1]\d|2[0-3])?[0-3]\d?:[0-5]\d:[0-5]\d$/
    return Joi.string().regex(timeRegex)
  }
}
function name(Joi) {
  if (!(Joi && Joi.isJoi)) {
    throw new Error('Joi Object Must be passed')
  }
  return function name() {
    const nameRegex = /^[a-zA-Z ]*$/
    return Joi.string().regex(nameRegex)
  }
}

function phone(Joi) {
  if (!(Joi && Joi.isJoi)) {
    throw new Error('Joi Object Must be passed')
  }

  return function phone() {
    const phoneRegExp = /^[+]?\d{5,20}$/
    return Joi.string().regex(phoneRegExp)
  }
}
function email(Joi) {
  if (!(Joi && Joi.isJoi)) {
    throw new Error('Joi Object Must be passed')
  }

  return function email() {
    return Joi.string().email({ minDomainAtoms: 2 }).lowercase()
  }
}

function deviceTimestamp(Joi) {
  if (!(Joi && Joi.isJoi)) {
    throw new Error('Joi Object Must be passed')
  }
  return function deviceTimestamp() {
    const numberPattern = /^([0-1][0-9]|2[0-3])[:]*[0-5][0-9][:]*[0-5][0-9]$/
    return Joi.string().regex(numberPattern)
  }
}

export {
  stringErrorHandler,
  numberErrorHandler,
  arrayErrorHandler,
  dateErrorHandler,
  objectId,
  time,
  timeWithSeconds,
  email,
  name,
  phone,
  deviceTimestamp,
}
