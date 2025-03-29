// import { verify } from 'jsonwebtoken';
import pkg from 'jsonwebtoken'
import env from '../../envConfig.js'
const { verify } = pkg

const verifyToken = (req, res, next) => {
  // Obtén el token del encabezado de la solicitud
  let token = req.headers['x-access-token'] || req.headers.authorization

  // Verifica si el token está presente
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' })
  }
  if (token.startsWith('Bearer ')) {
    // Eliminar el prefijo 'Bearer ' del token
    token = token.slice(7, token.length)
  }

  // Verifica el token
  verify(token, env.SecretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expirado.' })
      }
      return res.status(401).json({ error: 'Token inválido.' })
    }
    // Almacena el usuario decodificado en el objeto de solicitud para su uso posterior
    req.user = decoded
    const userId = decoded.id
    const userRole = decoded.role
    req.userInfo = { userId, userRole }
    // console.log(req.user.userId+' id del usuario')
    // console.log(req.user.email+': este es el email del usuario')

    next()
  })
}

export default verifyToken
