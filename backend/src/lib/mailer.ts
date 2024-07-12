import nodemailer from 'nodemailer'
import { env } from '../config/env'

export async function getMailClient() {
  const account = env.NODE_ENV !== 'production' ? await nodemailer.createTestAccount() : {
    user: env.MAIL_AUTH_USER,
    pass: env.MAIL_AUTH_PASS,
  }
  const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  })
  return transporter
}
