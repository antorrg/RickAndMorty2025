import { Router } from 'express'
import user from '../Handlers/Users/userHandlers.js'
import vg from '../Handlers/VideoGames/index.js'
import { verifyToken } from '../utils/index.js'

const cartRouter = Router()

cartRouter.get('/getUserShoppingCart/:userID', user.getUserShoppingCartHandler)
cartRouter.post('/createShoppingCart', verifyToken, user.postUserShoppingCartHandler)
cartRouter.post('/videogamesByIds', vg.postVideogamesByIdsHandler)

export default cartRouter
