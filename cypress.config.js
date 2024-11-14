const { defineConfig } = require('cypress');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',

    mochaJunitReporterReporterOptions: { mochaFile: 'cypress/reports/junit/results-[hash].xml' },

    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: 'Relatório de testes',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    },

    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: false,
  },

  chromeWebSecurity: false,

  e2e: {
    video: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('after:run', async () => {
        const reportPath = path.join(__dirname, 'cypress', 'reports', 'index.html');

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'dev.gbrlsouzal@gmail.com',
            pass: 'hsqwlpypyierinxc'
          },
        });

        fs.readFile(reportPath, (err, data) => {
          if (err) {
            console.error('Erro ao ler o relatório:', err);
            return;
          }

          const mailOptions = {
            from: 'dev.gbrlsouzal@gmail.com',
            to: 'dev.gbrlsouzal@gmail.com',
            subject: 'Relatório de Teste Cypress',
            text: 'Segue em anexo o relatório dos testes automatizados executados no Cypress.',
            attachments: [
              {
                filename: 'relatorio-cypress.html',
                content: data,
              },
            ],
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Erro ao enviar o e-mail:', error);
            } else {
              console.log('E-mail enviado:', info.response);
            }
          });
        });
      });

      return config;
    },
  },
});
