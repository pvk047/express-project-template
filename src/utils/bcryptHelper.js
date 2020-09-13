import bcrypt from 'bcrypt'

async function generateHash(text, saltRounds = 12) {
  return bcrypt.hash(text, saltRounds)
}

async function compareHash(text, hash) {
  return bcrypt.compare(text, hash)
}

export { generateHash, compareHash }
