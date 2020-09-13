import { isObjectUndefinedOrNullOrEmpty } from './variableChecking'
import mongoose from 'mongoose'

function convertBooleanValuesToNumber(obj) {
  if (isObjectUndefinedOrNullOrEmpty(obj)) {
    return obj
  }

  const keys = Object.keys(obj)
  keys.forEach((el) => {
    if (typeof obj[el] === 'boolean') {
      obj[el] = Number(obj[el])
    }
  })

  return obj
}

/**
 * convert mongo object to normal object
 * @param {*} obj object
 * @param {*} throwError whether rise an error or not
 */
function convertMongoObjectToNormalObject(obj, throwError) {
  try {
    obj = obj.toObject()
  } catch (error) {
    if (throwError) {
      throw error
    }
  }
  return obj
}

function convertStringToMongooseObjectId(str) {
  return mongoose.Types.ObjectId(str)
}

export {
  convertBooleanValuesToNumber,
  convertMongoObjectToNormalObject,
  convertStringToMongooseObjectId,
}
