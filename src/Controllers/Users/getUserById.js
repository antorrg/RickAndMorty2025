import { User } from '../../database.js'

const getUserById = async (id) => {
  try {
    const infodb = await User.findByPk(id)
    if (!infodb || infodb.deleteAt === true) {
      throw new Error('User not found')
    }
    return infodb
  } catch (error) {
    throw new Error({ error: error.message })
  }
}

const getAllUser = async () => {
  try {
    const infodb = await User.findAll()
    if (!infodb || infodb.deleteAt === true) {
      throw new Error('User not found')
    }
    return infodb
  } catch (error) {
    throw new Error({ error: error.message })
  }
}

export { getUserById, getAllUser }
