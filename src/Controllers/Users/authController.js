import { User } from '../../database.js'
import bcrypt from 'bcrypt'

const authenticateAndUpdate = async (email, password, sub, additionalFields) => {
  try {
    // Verificar la autenticación por email y contraseña
    if (email && password) {
      const existingUser = await User.findOne({
        where: {
          email,
          deleteAt: false
        }
      })

      if (existingUser) {
        const passwordMatch = await bcrypt.compare(password, existingUser.password)

        if (passwordMatch) {
          // Autenticación exitosa por email y contraseña
          return { isCreate: false, user: existingUser }
        } else {
          const error = new Error('Contraseña incorrecta')
          error.status = 400
          throw error
        }
      }
    }

    // Verificar la autenticación por email y sub
    if (email && sub) {
      const existingUser = await User.findOne({
        where: {
          email,
          sub,
          deleteAt: false
        }
      })
      if (existingUser && existingUser.sub === sub) {
        // Autenticación exitosa por email y sub
        return { isCreate: false, user: existingUser }
      }
    }

    // Si no hay coincidencias, crea un nuevo usuario
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null

    const [newUser, create] = await User.findOrCreate({
      where: {
        email
      },
      defaults: {
        email,
        password: hashedPassword,
        sub,
        ...additionalFields
      }
    })

    return { isCreate: create, user: newUser }
  } catch (error) {
    console.error('¡Hubo un error!', error)
    throw error
  }
}

export default authenticateAndUpdate
