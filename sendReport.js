require('dotenv').config()

const { ImapFlow } = require('imapflow')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const { create } = require('html-pdf-chrome')

const client = new ImapFlow({
  host: 'imap.gmail.com',
  port: 993,
  secure: true,
  waitUntil: 'domcontentloaded',
  greetingTimeout: 300000,
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
    for await (let message of client.fetch('1:*', { envelope: true })) { console.log(`${message.uid}: ${message.envelope.subject}`) }
  } finally { lock.release() }

  await client.logout()
}

main().catch(err => console.error(err))

const transporter = nodemailer.createTransport({
  host: `smtp.gmail.com`,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

const reportsDir = path.resolve(__dirname, 'cypress/reports')
const reportPath = path.join(reportsDir, 'html/index.html')
const pdfDir = path.join(reportsDir, 'pdf')
const pdfPath = path.join(pdfDir, 'relatorio-cypress.pdf')

function ensureDirectoryExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true })
    console.log(`Diretório criado: ${directoryPath}`)
  }
}

ensureDirectoryExists(pdfDir)

const reportContent = fs.readFileSync(reportPath, 'utf-8')
async function convertHtmlToPdf(htmlContent, outputPath) {
  try {
    await create(htmlContent).then((pdf) => pdf.toFile(outputPath)) 
    console.log('Relatório convertido para PDF com sucesso.')
  } catch (error) { console.error('Erro ao gerar o PDF:', error) }
}

fs.readFile(reportPath, (err, data) => {
  if (err) {
    console.error('Erro ao ler o relatório:', err)
    return
  }

  convertHtmlToPdf(reportContent, pdfPath).then(() => {
    console.log('Caminho do PDF:', pdfPath)
    if (!fs.existsSync(pdfPath)) {
      console.error('Erro: O arquivo PDF não foi gerado corretamente.')
      return
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: `gabrielsouza_1909@hotmail.com`,
      subject: `Relatório de Testes Cypress`,
      html: `<h3>Segue o relatório de testes do Cypress</h3>`,
      attachments: [
        {
          filename: 'relatorio-cypress.pdf',
          path: pdfPath
        }
      ]
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) { console.log('Erro ao enviar o e-mail:', error) }
      else { console.log('E-mail enviado:', info.response) }
    })
  })
})
