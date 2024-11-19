require('dotenv').config()

const { ImapFlow } = require('imapflow')
const client = new ImapFlow({
  host: 'imap.gmail.com',
  port: 993,
  secure: true,
  greetingTimeout: 30000,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

const main = async () => {
  await client.connect()

  let lock = await client.getMailboxLock('INBOX')

  try {
    let message = await client.fetchOne(client.mailbox.exists, { source: true })
    console.log(message.source.toString())

    for await (let message of client.fetch('1:*', { envelope: true })) {
      console.log(`${message.uid}: ${message.envelope.subject}`)
    }
  } finally {
    lock.release()
  }

  await client.logout()
}

main().catch(err => console.error(err))

const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')

const transporter = nodemailer.createTransport({
  host: `smtp.gmail.com`,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
})

const reportPath = path.resolve(__dirname, 'cypress/reports/html/index.html')
const reportContent = fs.readFileSync(reportPath, 'utf-8')

fs.readFile(reportPath, (err, data) => {
  if (err) {
    console.error('Erro ao ler o relatório:', err)
    return
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: `gabrielsouza_1909@hotmail.com`,
    subject: `Relatório de Testes Cypress`,
    html: `<h3>Segue o relatório de testes do Cypress</h3>`,
    attachments: [
      {
        filename: 'relatorio-cypress.html',
        content: reportContent
      }
    ]
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erro ao enviar o e-mail:', error)
    } else {
      console.log('E-mail enviado:', info.response)
    }
  })
})
