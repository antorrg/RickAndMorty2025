import { PurchaseOrder, PurchaseOrderItems } from '../../database.js'

const createOrderInDBController = async (userID, itemsData) => {
  console.log('soy userId en el controller: ', userID)
  // console.log("itemsData: " + JSON.stringify(itemsData));
  // return "ok";
  try {
    const createOrder = await PurchaseOrder.create({
      userId: userID,
      // itemsData: itemsData,
      // totalCost: 500,
      // status: "pending"
      status: 'waiting'
      // preferenceId: preferenceId
    })

    const arrayItemsIds = itemsData.map((item) => {
      return item.id
    })

    const itemsHistory = await PurchaseOrderItems.findAll({
      where: {
        itemId: arrayItemsIds,
        userId: userID,
        isRated: true
      }
    })
    // console.log("itemsHistory: " + JSON.stringify(itemsHistory));
    if (createOrder) {
      const arrayBulk = itemsData.map(item => {
        return {
          itemId: item.id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          currencyId: item.currencyId,
          orderId: createOrder.id,
          userId: userID,
          isRated: itemsHistory.some(auxItem => auxItem.itemId === item.id),
          status: 'waiting'
        }
      })

      const createOrderItems = await PurchaseOrderItems.bulkCreate(
        arrayBulk
      )

      if (createOrderItems) {
        return createOrder
      } else {
        const error = new Error('Items_not_created'); error.status = 500; throw error
      }
    } else {
      const error = new Error('Order_not_created'); error.status = 500; throw error
    }
    // return "Order_created";
  } catch (error) {
    console.error('Error 02: ', error.stack)
    throw error
  }
}

export default createOrderInDBController
