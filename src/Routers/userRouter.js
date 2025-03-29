import { Router } from 'express'
import user from '../Handlers/Users/userHandlers.js'
import { validUserCreate, validUserLog, verifyDoNotDel, verifyUsPas, verifyToken } from '../utils/index.js'

const userRouter = Router()

userRouter.get('/user', verifyToken, user.getUserHandler) // Protegida

userRouter.get('/user/:id', verifyToken, user.getUserDetailHand) // Libre

userRouter.post('/user', validUserCreate, user.userLogHandler)

userRouter.post('/user/login', validUserLog, user.loginUserHand)

userRouter.put('/user/:id', verifyToken, verifyUsPas, user.userUpdaterHand) // Modulo user

userRouter.delete('/user/:id', verifyToken, verifyDoNotDel, user.delUserHandler)

export default userRouter
