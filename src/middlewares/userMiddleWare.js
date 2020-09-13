import UserDataServiceProvider from '../services/database/userDataServiceProvider'
async function isUserExistsWithGivenEmail(req, res, next) {
  try {
    const { email } = req.body

    const isUserExists = await UserDataServiceProvider.isUserExistsWithEmail(
      email
    )

    if (!isUserExists) {
      return next()
    }

    const err = new Error()
    err.message =
      'User Already Registered with Given Email.Please Login to Continue'
    err.statusCode = 409
    err.errorCode = 'USER_ALREADY_EXISTS'
    throw err
  } catch (err) {
    return next(err)
  }
}

export { isUserExistsWithGivenEmail }
