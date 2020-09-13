import Schemas from './schemas'

module.exports = (useJoiError = false) => {
  const allowedMethods = ['post', 'get', 'put', 'patch', 'delete']
  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  }
  return (req, res, next) => {
    const route = getUrl(req.originalUrl)
    const method = req.method.toLowerCase()
    let schema = Schemas[route]

    if (!allowedMethods.includes(method)) {
      return next()
    }

    if (schema && schema.multi) {
      schema = schema[method]
    }

    if (!schema) {
      return next()
    }

    let data = req.body

    if (method === 'get') {
      data = Object.assign({}, req.query, req.params)
    }

    if (method === 'patch' || method === 'delete') {
      if (Object.keys(req.params).length) {
        data = Object.assign({}, req.body, req.params)
      }
    }

    if (!Object.keys(data).length) {
      return next()
    }

    const { error: err, value } = schema.validate(req.body, validationOptions)

    if (err) {
      const JoiError = {
        success: true,
        errors: {
          original: err._original,
        },
        details: (err.details || []).map(({ message, type, path, context }) => {
          const isNested = Array.isArray(path) && path.length > 1
          path = isNested ? path : context.key

          return {
            key: context.key || (path && path[0] ? path[0] : ''),
            message: message.replace(/['"]/g, ''),
            type,
            error_code: context.error_code || '',
            path,
            is_nested: isNested,
          }
        }),
        message: err.ValidationError,
      }
      return res.status(422).json(JoiError)
    }

    if (method === 'get') {
      req.query = value
    } else {
      req.body = value
    }

    return next()
  }
}

function getUrl(url) {
  url = url.replace(/^\/v[\d]\//, '')
  url = url.replace(/^\/mobile\//, '')
  if (url[0] !== '/') {
    url = '/' + url
  }
  return url
}
