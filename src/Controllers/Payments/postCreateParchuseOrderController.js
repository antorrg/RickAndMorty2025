import dotenv from 'dotenv'
import { MercadoPagoConfig, Preference } from 'mercadopago'

dotenv.config()
const { MERCADOPAGO_ACCESS_TOKEN, PORT_MP, FRONT } = process.env
const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN })
const preference = new Preference(client)

const postCreateParchuseOrderController = async (
  userID,
  userEmail,
  items,
  orderID,
  req,
  res
) => {
  console.log('userID: ' + userID)
  console.log('userEmail: ' + userEmail)
  // console.log("auxItems: " + JSON.stringify(auxItems));

  // mercadopago.configure({
  //   access_token: MERCADOPAGO_ACCESS_TOKEN,
  // });

  const preferences = {
    items,
    /* payer: {
      name: 'João',
      surname: 'Silva',
      email: 'user@email.com'
    }, */
    back_urls: {
      /* "success": `http://localhost:3000/checkout/Succesfull`,
			"failure": `http://localhost:3000/checkout/Failure`,
			"pending": `http://localhost:3000/checkout/Pending` */
      // "success": "http://localhost:3001/success",
      success: `${FRONT}/checkout/Succesfull`,
      failure: `${FRONT}/checkout/Failure`,
      pending: `${FRONT}/checkout/Pending`
    },
    auto_return: 'approved',
    external_reference: orderID + '-_' + userEmail + '-_' + userID,
    // notification_url: `https://e266-181-53-96-74.ngrok-free.app/post/paymentResultwebhook`
    notification_url: `${PORT_MP}/post/paymentResultwebhook`
    // notification_url: "https://3fd5-181-53-96-163.ngrok-free.app/post/webhook"
    // auto_return: "approved"
    // auto_return: "http://localhost:3000/pending"
  }

  /*
	getRouter.get("/success", (req, res) => res.send("success"));
getRouter.get("/failure", (req, res) => res.send("failure"));
getRouter.get("/pending", (req, res) => res.send("pending"));
getRouter.get("/webhook", (req, res) => res.send("webhook"));
	*/

  try {
    const orderResult = await preference.create({ preferences })
    // const body = orderResult.body;
    // console.log(orderResult.body);
    // return orderResult.body;
    // const transactionId = orderResult.body.id;
    if (!orderResult) { const error = new Error('postCreateParchuseOrderController not found'); error.status(404); throw error }
    return orderResult.body
  } catch (error) {
    throw error
  }
}

export default postCreateParchuseOrderController
