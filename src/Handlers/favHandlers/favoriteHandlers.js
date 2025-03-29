import eh from '../../utils/errorHandler.js'
import favContr from '../../Controllers/Favorites/favoriteControllers.js'

export default {
  addFavHandler: eh.catchController(async (req, res) => {
    const userId = req.user.userId
    const { id, name, gender, status, species, image } = req.body
    const resp = await favContr.addFav(userId, id, name, gender, status, species, image)
    res.status(201).json(resp)
  }),
  getFavHandler: eh.catchController(async (req, res) => {
    const userId = req.user.userId
    const response = await favContr.getFav(userId)
    res.status(200).json(response)
  }),

  delfavHandler: eh.catchController(async (req, res) => {
    const userPP = req.user.userId
    const { id } = req.params
    const del = await favContr.deleteFav(id, userPP)
    res.status(200).json(del)
  })
}
