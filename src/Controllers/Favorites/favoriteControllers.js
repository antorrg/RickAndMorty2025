import { Favorite, User } from '../../database.js'
import eh from '../../utils/errorHandler.js'
import { emptyRes } from '../../utils/index.js'

export default {
  addFav: async (userId, id, name, gender, status, species, image) => {
    const user = await User.findByPk(userId)
    try {
      const existingFav = await Favorite.findByPk(id)
      if (existingFav) {
        const userHasFavorite = await user.hasFavorite(existingFav)

        if (userHasFavorite) {
          const fav = {}
          const error = new Error('1 Usted ya tiene ese favorito')
          error.status = 400
          throw error
        }
        try {
          const fav = await user.addFavorite(existingFav)
          return fav
        } catch (error) {
          throw new Error('2 Error al asignar Favorito')
        }
      } else {
        try {
          const newFav = await Favorite.create({
            id,
            name,
            gender: gender || 'unknown',
            status: status || 'unknown',
            species: species || 'unknown',
            image
          })
          await user.addFavorite(newFav)
          const fav = newFav
          return fav
        } catch (error) {
          throw new Error('2 Error al crear Favorito')
        }
      }
    } catch (error) {
      throw error
    }
  },
  getFav: async (userId) => {
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Favorite,
            attributes: ['id', 'name', 'gender', 'status', 'species', 'image'],
            through: { attributes: [] }
          }
        ]
      })

      if (!user) {
        eh.throwError('Usuario no encontrado.', 404)
      }

      const favorites = user.Favorites
      if (favorites.length === 0) { return emptyRes() }
      return favorites
    } catch (error) {
      throw error
    }
  },
  deleteFav: async (id, userPP) => {
    try {
      const user = await User.findByPk(userPP)
      if (!user) { eh.throwError('Usuario no hallado', 404) }

      const favorite = await Favorite.findByPk(id)
      if (!favorite) { eh.throwError('Favorito no hallado', 404) }

      await user.removeFavorite(favorite)
      return id
    } catch (error) {
      throw error
    }
  }
}
