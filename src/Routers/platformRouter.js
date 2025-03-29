import { Router } from 'express'
import game from '../Handlers/Admin/index.js'
import { verifyToken } from '../utils/index.js'

const platformRouter = Router()

platformRouter.get('/platforms', game.getPlatformHandler) // Protegida
platformRouter.post('/platform', verifyToken, game.createPlatformHandler)
platformRouter.put('/platform/:id', verifyToken, game.platformUpdaterHand) // Modulo platform
platformRouter.delete('/platforms/:id', verifyToken, game.delPlatformHand)

export default platformRouter
