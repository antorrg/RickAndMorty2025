import eh from '../../utils/errorHandler.js'
import postVideogamesByIdsController from '../../Controllers/VideoGames/postVideogamesByIdsController.js'
import getVideogames from '../../Controllers/VideoGames/getVideogames.js'
import getGameById from '../../Controllers/VideoGames/gameDetailController.js'
import getRatedByItemIdController from '../../Controllers/Payments/getRatedByItemIdController.js'

export default {
  postVideogamesByIdsHandler: eh.catchController(async (req, res) => {
    const { ids } = req.body
    const videogamesData = await postVideogamesByIdsController(ids)
    res.status(201).json(videogamesData)
  }),

  getVideogamesHandler: eh.catchController(async (req, res) => {
    const {
      page = 0,
      size = 5,
      platforms,
      genres,
      minPrice,
      maxPrice,
      order,
      name
    } = req.query
    const videogamesData = await getVideogames(page, size, platforms, genres, minPrice, maxPrice, order, name)
    res.status(201).json(videogamesData)
  }),

  getDetailHandler: eh.catchController(async (req, res) => {
    const { id } = req.params

    const response = await getGameById(id)
    const ratedItem = await getRatedByItemIdController(id)

    response.rated = ratedItem

    res.status(200).json(response)
  })
}
