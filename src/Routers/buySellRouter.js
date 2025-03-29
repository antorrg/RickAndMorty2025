import { Router } from 'express'
import pay from '../Handlers/Payments/index.js'

import { verifyToken } from '../utils/index.js'

const buySellRouter = Router()

buySellRouter.get('/getParchuseOrder', pay.getPurchaseOrderHandler)
buySellRouter.get('/success', (req, res) => res.send('success'))
buySellRouter.get('/failure', (req, res) => res.send('failure'))
buySellRouter.get('/pending', (req, res) => res.send('pending'))
buySellRouter.get('/getOrdersByUserId', pay.getPurchaseOrderByIdHandler)
buySellRouter.get('/getRatedPendingItemsByUserId', pay.getRatedPendingItemsByUserIdHandler)
buySellRouter.get('/getRatedByItemId/:itemID', pay.getRatedByItemIdHandler)
buySellRouter.post('/paymentResultwebhook', pay.postPaymentResultWebhookHandler)
buySellRouter.post('/createParchuseOrder', verifyToken, pay.postCreateParchuseOrderHandler)
buySellRouter.post('/postUserRated', verifyToken, pay.postUserRatedHandler)

export default buySellRouter
