const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dev.gbrlsouzal@gmail.com',
    pass: 'hsqwlpypyierinxc'
  }
});

const reportPath = path.join(__dirname, 'cypress', 'reports', 'index.html');

fs.readFile(reportPath, (err, data) => {
  if (err) {
    console.error('Erro ao ler o relatório:', err);
    return;
  }

  const mailOptions = {
    from: 'dev.gbrlsouza@gmail.com',
    to: 'dev.gbrlsouza@gmail.com',
    subject: 'Relatório de Teste Cypress',
    text: 'Segue em anexo o relatório dos testes automatizados executados no Cypress.',
    attachments: [
      {
        filename: 'relatorio-cypress.html',
        content: data
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erro ao enviar o e-mail:', error);
    } else {
      console.log('E-mail enviado:', info.response);
    }
  });
});
