require('dotenv').config()

const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const { create } = require('html-pdf-chrome')
const { waitForTick } = require('pdf-lib')

async function ensureDirectoryExists(directoryPath) {
  try {
    await fs.promises.mkdir(directoryPath, { recursive: true })
    console.log(`Diretório criado ou já existe: ${directoryPath}`)
  } catch (error) { console.error('Erro ao criar diretório:', error) }
}

async function sendEmailWithAttachment(pdfPath) {
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
      {
        filename: 'video.mp4',
        path: videoPath,
      },
    ],
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('E-mail enviado com sucesso:', info.response)
  } catch (error) { console.error('Erro ao enviar o e-mail:', error) }
}

async function checkCypressReportForErrors(htmlFilePath) {
  try {
    const htmlContent = await fs.promises.readFile(htmlFilePath, 'utf-8')
    return htmlContent.includes('failed')
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') { console.error('Erro ao gerar o PDF: Arquivo HTML não encontrado ou não é um arquivo válido! Possivel teste sem falhas!') }
    else if (error.message.includes('failed to launch')) { console.error('Erro ao gerar o PDF: Problema ao iniciar o navegador Chrome') }
    else if (!htmlFilePath || htmlContent.trim() === '') { console.error('Erro ao gerar o PDF: Arquivo HTML vazio ou inválido') }
    else { console.error('Erro ao gerar o PDF:', error) }
    
    return false
  }
}

async function convertHtmlToPdf(htmlFilePath, outputPdfPath) {
  try {
    const htmlContent = await fs.promises.readFile(htmlFilePath, 'utf-8')

    const options = {
      launchOptions: {
        headless: true,
        executablePath: '/usr/bin/google-chrome',
      },

      printOptions: {
        format: 'A4',
        landscape: true,
        waitFor: 300,
        printBackground: true,
        preferCSSPageSize: true
      },
    }

    const pdf = await create(htmlContent, options)

    setTimeout(async () => {
      await pdf.toFile(outputPdfPath)
      console.log('Relatório convertido para PDF com sucesso:', outputPdfPath)
    }, 25000)
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') { console.error('Erro ao gerar o PDF: Arquivo HTML não encontrado ou não é um arquivo válido! Possivel teste sem falhas!') }
    else if (error.message.includes('failed to launch')) { console.error('Erro ao gerar o PDF: Problema ao iniciar o navegador Chrome') }
    else if (!htmlFilePath || htmlContent.trim() === '') { console.error('Erro ao gerar o PDF: Arquivo HTML vazio ou inválido') }
    else { console.error('Erro ao gerar o PDF:', error) }
  }
}

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
const reportPath = path.join(reportsDir, 'html', 'index.html')
const pdfDir = path.join(reportsDir, 'pdf')
const pdfPath = path.join(pdfDir, 'relatorio-cypress.pdf')
const videoDir = path.join(reportsDir, 'html/videos')
const videoPath = path.join(videoDir, 'todo.cy.js.mp4')

ensureDirectoryExists(pdfDir).then(async () => {
  const hasErrors = await checkCypressReportForErrors(reportPath)

  if (hasErrors) {
    await convertHtmlToPdf(reportPath, pdfPath)

    if (!fs.existsSync(pdfPath)) {
      console.error('Erro: O arquivo PDF não foi gerado corretamente.')
      return
    }

    await sendEmailWithAttachment(pdfPath)
  } else { console.log('Nenhum erro encontrado nos testes do Cypress. Nenhum e-mail enviado.') }
})
