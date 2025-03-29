import eh from '../../utils/errorHandler.js'
import { createGameDB, createGenreDB, createPlatformDB } from '../../Controllers/VideoGames/AdminControllers/gamesPostController.js'
import { getAllGamesAdminController, genres, platforms } from '../../Controllers/VideoGames/AdminControllers/gamesControllers.js'
import { updateVideogame, updateGenre, updatePLatform } from '../../Controllers/VideoGames/AdminControllers/gameUpdController.js'
import { gameDelete, genreDelete, platformDelete } from '../../Controllers/VideoGames/AdminControllers/gameDelController.js'

export default {
  createGameHandler: eh.catchController(async (req, res) => {
    const { name, description, image, released, genres, platforms, price, physicalGame, stock } = req.body
    const response = await createGameDB(name, description, image, released, genres, platforms, price, physicalGame, stock)
    res.status(201).json(response)
  }),

  createGenreHandler: eh.catchController(async (req, res) => {
    const { name } = req.body
    const response = await createGenreDB(name)
    res.status(201).json(response)
  }),

  createPlatformHandler: eh.catchController(async (req, res) => {
    const { name } = req.body
    const response = await createPlatformDB(name)
    res.status(201).json(response)
  }),
  getGamesAdminHandler: eh.catchController(async (req, res) => {
    const { page = 0, size = 5, platforms, genres, minPrice, maxPrice, order, name } = req.query

    const filters = { deleteAt: false }
    const platformsFilters = {}
    const genresFilters = {}
    const orderFilter = []

    // Verificar si se solicita algun ordenamiento
    if (order && order !== 'none') {
      const auxArray = order.split('_')
      console.log('auxArray: ' + auxArray)
      switch (auxArray[1]) {
        case 'N':
          orderFilter.push(['name', auxArray[0]])
          break
        case 'P':
          orderFilter.push(['price', auxArray[0]])
          break
      }
    }
    // Verifica si se proporciona el parámetro de filtro 'platform'
    if (platforms) {
      const arrayPlatforms = platforms.split(',')
      platformsFilters.name = { [Op.in]: arrayPlatforms }
    }
    // Verifica si se proporciona el parámetro de filtro 'genre'
    if (genres) {
      const arrayGenres = genres.split(',')
      genresFilters.name = { [Op.in]: arrayGenres }
    }
    // Verifica si se proporciona el parámetro de filtro 'precio'
    if (minPrice && maxPrice) {
      filters.price = { [Op.between]: [+minPrice, +maxPrice] }
    } else if (minPrice) {
      filters.price = { [Op.gte]: +minPrice }
    } else if (maxPrice) {
      filters.price = { [Op.lte]: +maxPrice }
    }

    // Verificar si se esta buscando algun nombre en particular
    if (name) {
      filters.name = { [Op.iLike]: `%${name}%` }
    }
    const videogamesData = await getAllGamesAdminController(page, size, filters, platformsFilters, genresFilters, orderFilter)
    res.status(201).json(videogamesData)
  }),

  getGenresHandler: eh.catchController(async (req, res) => {
    const response = await genres()
    res.status(200).json(response)
  }),

  getPlatformHandler: eh.catchController(async (req, res) => {
    const response = await platforms()
    res.status(200).json(response)
  }),
  gameUpdaterHand: eh.catchController(async (req, res) => {
    const { id } = req.params
    const newData = req.body
    const response = await updateVideogame(id, newData)
    res.status(200).json(response)
  }),

  genreUpdaterHand: eh.catchController(async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const response = await updateGenre(id, name)
    res.status(200).json(response)
  }),

  platformUpdaterHand: eh.catchController(async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const response = await updatePLatform(id, name)
    res.status(200).json(response)
  }),
  delGameHand: eh.catchController(async (req, res) => {
    const { id } = req.params
    const response = await gameDelete(id)
    res.status(200).json(response)
  }),

  delGenreHand: eh.catchController(async (req, res) => {
    const { id } = req.params
    const response = await genreDelete(id)
    res.status(200).json(response)
  }),

  delPlatformHand: eh.catchController(async (req, res) => {
    const { id } = req.params
    const response = await platformDelete(id)
    res.status(200).json(response)
  })
}
