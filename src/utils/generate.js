import pkg from 'jsonwebtoken'
import dotenv from 'dotenv'
const { sign } = pkg
dotenv.config()
const { SECRET_KEY } = process.env

const generateToken = (user) => {
  const secretKey = SECRET_KEY
  const token = sign({ userId: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: '5h' })
  return token
}

export default generateToken

// const crypto = require('crypto');

// const generateSecret = () => {
//   return crypto.randomBytes(32).toString('hex');
// };

// const secret = generateSecret();
// console.log(`La cadena secreta generada es: ${secret}`);
