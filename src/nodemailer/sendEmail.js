import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import emailContent from './SendEmailWelcome.js'
dotenv.config()
const { USER_NODEMAILER, PASS_NODEMAILER } = process.env

async function sendEmailWelcome (userEmail) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'Gmail',
    auth: {
      user: USER_NODEMAILER,
      pass: PASS_NODEMAILER
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailSend = {
    from: PASS_NODEMAILER,
    // ? correo de test comentar y descomentar la siguiente linea pero actualmente envía a spam
    // to: "yawon80039@jalunaki.com",
    // ? descomentar para enviar al correo del usuario que se registra
    to: userEmail,
    subject: 'GameWorld - ¡Bienvenido!',
    // text: "¡Bienvenido a GameWorld " + userNickname + "!",
    html: emailContent
  }

  transporter.sendMail(mailSend, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error)
    } else {
      console.log('Correo enviado con éxito a ', userEmail, info.response)
    }
  })
}

export default sendEmailWelcome
