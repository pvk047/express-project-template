import UserDataServiceProvider from '../services/database/userDataServiceProvider'
import { generateHash } from '../utils/bcryptHelper'

async function signUp(req, res, next) {
  try {
    const userData = req.body
    userData.password = generateHash(userData.password)
    const createdUser = await UserDataServiceProvider.createUser(userData)

    return res.status(201).json({
      success: true,
      created_user: createdUser,
      message: 'User Created Successfully.',
    })
  } catch (err) {
    return next(err)
  }
}

export { signUp }
