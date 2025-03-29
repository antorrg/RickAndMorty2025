import eh from '../../utils/errorHandler.js'
import getOrdersByUserIdController from '../../Controllers/Payments/getOrdersByUserIdController.js'
import getParchuseOrderController from '../../Controllers/Payments/getParchuseOrderController.js'
import getRatedByItemIdController from '../../Controllers/Payments/getRatedByItemIdController.js'
import getRatedPendingItemsByUserIdController from '../../Controllers/Payments/getRatedPendingItemsByUserIdController.js'
import postCreateParchuseOrderController from '../../Controllers/Payments/postCreateParchuseOrderController.js'
import createOrderInDBController from '../../Controllers/Payments/createOrderInDBController.js'
import updateOrderProferenceIdController from '../../Controllers/Payments/updateOrderProferenceIdController.js'
import updateOrderStatusController from '../../Controllers/Payments/updateOrderStatusController.js'
import SendMailPurchaseResult from '../../nodemailer/SendEmailPurchaseResult.js'
import postUserShoppingCartController from '../../Controllers/Users/postUserShoppingCartController.js'
import mercadopago from 'mercadopago'
import postUserRatedController from '../../Controllers/Payments/postUserRatedController.js'

export default {
  getPurchaseOrderByIdHandler: eh.catchController(async (req, res) => {
    const { userID, page = 0, size = 5, status } = req.query
    const ordersData = await getOrdersByUserIdController(userID, page, size, status)
    res.status(201).json(ordersData)
  }),

  getPurchaseOrderHandler: eh.catchController(async (req, res) => {
    const { payment_id, external_reference } = req.query

    const arrayReferenceData = external_reference.split('-_')
    console.log('payment_id: ' + payment_id)
    console.log('arrayReferenceData: ' + arrayReferenceData[0])

    const orderData = await getParchuseOrderController(parseInt(arrayReferenceData[0]))
    res.status(201).json(orderData)
  }),

  getRatedByItemIdHandler: eh.catchController(async (req, res) => {
    const { itemID } = req.params

    console.log('itemID::: ' + itemID)

    const response = await getRatedByItemIdController(itemID)
    res.status(200).json(response)
  }),

  getRatedPendingItemsByUserIdHandler: eh.catchController(async (req, res) => {
    const {
      userID,
      page = 0,
      size = 5
    } = req.query

    const ratedPendingItems = await getRatedPendingItemsByUserIdController(userID, page, size)
    res.status(201).json(ratedPendingItems)
  }),

  postCreateParchuseOrderHandler: eh.catchController(async (req, res) => {
    const { userID, userEmail, items } = req.body
    // console.log('llegue al handler: ', req.body)

    if (!items || items.length === 0) {
      eh.throwError('No items attached', 400)
    }

    const auxItems = items.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        currencyId: item.currency_id
      }
    })
    // ------------------------------
    const createOrderDB = await createOrderInDBController(userID, auxItems)
    if (!createOrderDB) { console.error('puede ser por la primera') }
    const orderBodyMercadoPago = await postCreateParchuseOrderController(userID, userEmail, items, createOrderDB.id.toString())
    if (!orderBodyMercadoPago) { console.error('puede ser por la segunda') }
    const updateOrder = await updateOrderProferenceIdController(createOrderDB.id, orderBodyMercadoPago.id)
    if (!updateOrder) { console.error('puede ser por la tercera') }
    if (updateOrder) {
      res.status(201).json({ body: orderBodyMercadoPago })
    } else {
      eh.throwError('Order_not_update', 400)
    }
  }),

  postPaymentResultWebhookHandler: eh.catchController(async (req, res) => {
    console.log('PAYMENT_RESULT: ' + JSON.stringify(req.query))
    const payment = req.query

    if (payment.type === 'payment') {
      const data = await mercadopago.payment.findById(payment['data.id'])
      const arrayReferenceData = data.body.external_reference.split('-_')
      const updateOrderDB = await updateOrderStatusController(parseInt(arrayReferenceData[0]), data.body.status, data.body.status_detail, data.body.id.toString())

      if (data.body.status === 'approved') {
        await postUserShoppingCartController(arrayReferenceData[2], [])
      }

      await SendMailPurchaseResult(arrayReferenceData[1], data.body.status, data.body.additional_info.items)
    }
    res.status(201).json({ result: 'Resultado del pago' })
  }),

  postUserRatedHandler: eh.catchController(async (req, res) => {
    const { userID, itemID, comment, score } = req.body
    // console.log('userID: ' + userID)
    // console.log('itemID: ' + itemID)
    // console.log('comment: ' + comment)
    // console.log('score: ' + score)

    const ratedData = await postUserRatedController(userID, itemID, comment, score)
    res.status(201).json(ratedData)
  })

}
