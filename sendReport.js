require('dotenv').config()

const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const { create } = require('html-pdf-chrome')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
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

async function convertHtmlToPdf(htmlFilePath, outputPdfPath) {
  try {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8')
    const options = {
      launchOptions: {
        headless: true,
        executablePath: '/usr/bin/google-chrome',
      },
      printOptions: {
        format: 'A4', 
        printBackground: true,
      },
    }

    await create(htmlContent, options).then((pdf) => pdf.toFile(outputPdfPath))
    console.log('Relatório convertido para PDF com sucesso:', outputPdfPath)
  } catch (error) { console.error('Erro ao gerar o PDF:', error) }
}

convertHtmlToPdf(reportPath, pdfPath).then(() => {
  if (!fs.existsSync(pdfPath)) {
    console.error('Erro: O arquivo PDF não foi gerado corretamente.')
    return
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'gabrielsouza_1909@hotmail.com',
    subject: 'Relatório de Testes Cypress',
    html: '<h3>Segue o relatório de testes do Cypress</h3>',
    attachments: [
      {
        filename: 'relatorio-cypress.pdf',
        path: pdfPath,
      },
    ],
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) { console.log('Erro ao enviar o e-mail:', error) }
    else { console.log('E-mail enviado:', info.response) }
  })
})
