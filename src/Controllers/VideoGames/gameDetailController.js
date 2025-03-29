import { Genre, Platform, Videogame } from '../../database.js'
import { datamaped } from '../../utils/index.js'

const getGameById = async (id) => {
  try {
    const infodb = await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
          attributes: ['name'],
          through: { attributes: [] }
        },
        {
          model: Platform,
          attributes: ['name'],
          through: { attributes: [] }
        }
      ]
    })

    if (!infodb || infodb.deleteAt === true) {
      throw new Error('Videogame not found')
    }

    const infoWash = datamaped(infodb)
    return infoWash
  } catch (error) {
    throw new Error({ error: error.message })
  }
}

export default getGameById
