import { Router } from 'express'
import game from '../Handlers/Admin/index.js'

import { verifyToken } from '../utils/index.js'
const genresRouter = Router()

genresRouter.get('/genres', game.getGenresHandler) // Protegida
genresRouter.post('/genre', verifyToken, game.createGenreHandler)
genresRouter.put('/genre/:id', verifyToken, game.genreUpdaterHand) // Modulo genre
genresRouter.delete('/genres/:id', verifyToken, game.delGenreHand)

export default genresRouter
