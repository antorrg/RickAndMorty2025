import dotenv from 'dotenv'
const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env'
dotenv.config({ path: envFile })

const { PORT, DB_NAME, DB_USER, DB_PASS, DB_HOST, DATABASE_URL, DB_DEPLOY, SECRET_KEY, USER_NODEMAILER, PASS_NODEMAILER, MERCADOPAGO_ACCESS_TOKEN, PORT_MP, FRONT, SUDO_AUTH, USER, PASS, IMG, EMPTYIMG } = process.env
const db = process.env.NODE_ENV === 'development' ? `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}` : DB_DEPLOY

export default {
  Port: PORT,
  Status: process.env.NODE_ENV === 'development' ? 'in development' : 'in production',
  ConnectDb: db,
  RaillwayDb: DATABASE_URL,
  optionRender: process.env.NODE_ENV !== 'development',
  SecretKey: SECRET_KEY,
  UserMail: USER_NODEMAILER,
  PassMail: PASS_NODEMAILER,
  MpAccesToken: MERCADOPAGO_ACCESS_TOKEN,
  MpPort: PORT_MP,
  UrlFront: FRONT,
  SuperUser: SUDO_AUTH,
  User: USER,
  Pass: PASS,
  Image: IMG,
  EmptyImg: EMPTYIMG
}
