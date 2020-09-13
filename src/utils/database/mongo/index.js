import mongoose from 'mongoose'
import config from '../../../config'
class DataBase {
  async connect() {
    try {
      const db = await mongoose.connect(
        config.database.mongo.connection_string,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      console.log('MongoDB Connection Created Successfully')
      return db
    } catch (err) {
      console.error(err)
    }
  }

  async closeConnection() {
    return mongoose.Connection.close()
  }
}

export default new DataBase()
