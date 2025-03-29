import eh from '../../utils/errorHandler.js'
import { userCreate, userwithPass, userWithPassLogin } from '../../Controllers/Users/userLogin.js'
import getUser from '../../Controllers/Users/getUser.js'
import { getUserById, getAllUser } from '../../Controllers/Users/getUserById.js'
import { userUpdController, userSUpdController } from '../../Controllers/Users/userUpdController.js'
import delUser from '../../Controllers/Users/delUser.js'
import getUserShoppingCartController from '../../Controllers/Users/getUserShoppingCartController.js'
import postUserShoppingCartController from '../../Controllers/Users/postUserShoppingCartController.js'

export default {

  userLogHandler: eh.catchController(async (req, res) => {
    const { email, password, nickname, given_name, picture, sub } = req.body
    if (email && sub && !password) {
      const send = await userCreate(email, password, nickname, given_name, picture, sub)
      res.status(201).json(send)
    } else if (email && password) {
      const send = await userwithPass(email, password)
      res.status(201).json(send)
    }
  }),

  loginUserHand: eh.catchController(async (req, res) => {
    const { email, password } = req.body
    const send = await userWithPassLogin(email, password)
    res.status(201).json(send)
  }),

  getUserHandler: eh.catchController(async (req, res) => {
    const { page = 0, size = 20 } = req.query
    const user = await getUser(page, size)
    res.status(200).json(user)
  }),

  getUserDetailHand: eh.catchController(async (req, res) => {
    const { id } = req.params
    const response = await getUserById(id)
    res.status(200).json(response)
  }),
  getUserAllHand: eh.catchController(async (req, res) => {
    const response = await getAllUser()
    res.status(200).json(response)
  }),

  userUpdaterHand: eh.catchController(async (req, res) => {
    const { id } = req.params
    const newData = req.body

    const response = await userUpdController(id, newData)
    res.status(200).json(response)
  }),

  userSUpdaterHand: eh.catchController(async (req, res) => {
    const { id } = req.params
    const newData = req.body

    const response = await userSUpdController(id, newData)
    res.status(200).json(response)
  }),

  delUserHandler: eh.catchController(async (req, res) => {
    const { id } = req.params

    const response = await delUser(id)
    res.status(200).json(response)
  }),

  postUserShoppingCartHandler: eh.catchController(async (req, res) => {
    const { userID, cartItems } = req.body

    // console.log("userID: " + userID);
    // console.log("cartItems: " + JSON.stringify(cartItems));

    const auxArray = cartItems.map(obj => {
      return {
        userId: userID,
        gameId: obj.id,
        quantity: obj.quantity
      }
    })
    const response = await postUserShoppingCartController(userID, auxArray)
    res.status(200).json(response)
  }),

  getUserShoppingCartHandler: eh.catchController(async (req, res) => {
    const { userID } = req.params

    // console.log("userID 1: " + userID);

    const response = await getUserShoppingCartController(userID)
    res.status(200).json(response)
  })

}
