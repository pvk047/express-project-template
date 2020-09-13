import UserModel from '../../models/userModel'

class UserDataServiceProvider {
  createUser(userData) {
    return UserModel.create(userData)
  }

  getUsers({ query, skip = null, limit = null, sort = {}, projection = {} }) {
    return UserModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
  }

  isUserExistsWithEmail(email) {
    return UserModel.findOne({
      email,
    }).select({ _id: 1 })
  }
}

export default new UserDataServiceProvider()
