// import { sign } from'jsonwebtoken';
import pkg from 'jsonwebtoken'
import env from '../../envConfig.js'
const { sign } = pkg

const generateToken = (user) => {
  const token = sign({ userId: user.id, email: user.email, role: user.role }, env.SecretKey, { expiresIn: '5h' })
  return token
}

export default generateToken

// const crypto = require('crypto');

// const generateSecret = () => {
//   return crypto.randomBytes(32).toString('hex');
// };

// const secret = generateSecret();
// console.log(`La cadena secreta generada es: ${secret}`);
