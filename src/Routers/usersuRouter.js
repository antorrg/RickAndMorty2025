import { Router } from 'express'
import user from '../Handlers/Users/userHandlers.js'
import { validUserSu } from '../utils/index.js'

const usersuRouter = Router()

usersuRouter.get('/usersu', validUserSu, user.getUserAllHand) // Protegida
usersuRouter.put('/usersu/:id', validUserSu, user.userSUpdaterHand) // Protegida

export default usersuRouter
