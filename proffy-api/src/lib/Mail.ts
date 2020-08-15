import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk'
import path from 'path'

interface ISendMailDTO {
  from?: {
    name: string
    email: string
  }
  to: {
    name: string
    email: string
  }
  subject: string
  text: string
}

aws.config.loadFromPath(path.resolve(__dirname, '..', '..', 'awsconfig.json'))

class Mail {
  client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({ apiVersion: '2010-12-01' })
    })
  }

  public async sendMail(data: ISendMailDTO): Promise<void> {
    const { from, to, subject, text } = data

    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Proffy',
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
  }
}

export default new Mail()
