import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  email_confirmed: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'ACTIVE',
  },
  type: {
    type: String,
    default: 'END_USER',
  },
})
userSchema.index({ email: 1 }, { unique: true, background: true })

const userModel = mongoose.model('User', userSchema)

export default userModel
