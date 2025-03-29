import { Router } from 'express'
import game from '../Handlers/Admin/index.js'
import videoG from '../Handlers/VideoGames/index.js'
import { verifyToken } from '../utils/index.js'
const gamesRouter = Router()

gamesRouter.get('/games', game.getGamesAdminHandler) // Libres
gamesRouter.get('/games/:id', videoG.getDetailHandler) // Modulos games/videogames (Libres)
gamesRouter.get('/videogames', videoG.getVideogamesHandler)// Modulos games/videogames (Libres)
gamesRouter.post('/games', verifyToken, game.createGameHandler)// Aqui cometi el error de dejarlo asi.
gamesRouter.put('/games/:id', verifyToken, game.gameUpdaterHand) // Modulo games/videogames
gamesRouter.delete('/games/:id', verifyToken, game.delGameHand)

export default gamesRouter
