const nodemailer = require('nodemailer')
const fs = require('fs')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'dev.gbrlsouzal@gmail.com',
    pass: 'hsqw lpyp yier inxc'
  }
})

const reportPath = path.join(__dirname, 'cypress', 'reports', 'index.html')
const reportContent = fs.readFileSync(reportPath, 'utf-8');

fs.readFile(reportPath, (err, data) => {
  if (err) {
    console.error('Erro ao ler o relatório:', err)
    return
  }

  const mailOptions = {
    from: 'dev.gbrlsouza@gmail.com',
    to: 'dev.gbrlsouza@gmail.com',
    subject: 'Relatório de Testes Cypress',
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
