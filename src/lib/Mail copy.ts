import nodemailer, { Transporter } from 'nodemailer'

interface ISendMailDTO {
  from?: {
    name: string
    email: string
  },
  to: {
    name: string
    email: string
  },
  subject: string
  text: string
}

class Mail {
  client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch((error) => {
        console.log('Erro no email: ', error)
      })
  }

  public async sendMail(data: ISendMailDTO): Promise<void> {
    const { from, to, subject, text } = data

    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Caio Medeiros',
        address: from?.email || 'caio.quirino.medeiros@gmail.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      text
    })

    console.log(`Message sent: ${message.messageId}`)
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`)
  }
}

export default new Mail()
