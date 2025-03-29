import { Router } from 'express'
import gamesRouter from './gamesRouter.js'
import genresRouter from './genresRouter.js'
import platformRouter from './platformRouter.js'
import userRouter from './userRouter.js'
import usersuRouter from './usersuRouter.js'
import buySellRouter from './buySellRouter.js'
import cartRouter from './cartRouter.js'
import favRouter from './favRouter.js'

const mainRouter = Router()

mainRouter.use(gamesRouter)

mainRouter.use(genresRouter)

mainRouter.use(platformRouter)

mainRouter.use(userRouter)

mainRouter.use(usersuRouter)

mainRouter.use(buySellRouter)

mainRouter.use(cartRouter)

mainRouter.use(favRouter)

export default mainRouter
