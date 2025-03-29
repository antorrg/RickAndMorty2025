import { Router } from 'express'
import fav from '../Handlers/favHandlers/favoriteHandlers.js'
import { verifyToken } from '../utils/index.js'

const favRouter = Router()

favRouter.post('/favorite', verifyToken, fav.addFavHandler)

favRouter.get('/favorite', verifyToken, fav.getFavHandler)

favRouter.delete('/favorite/:id', verifyToken, fav.delfavHandler)

export default favRouter
