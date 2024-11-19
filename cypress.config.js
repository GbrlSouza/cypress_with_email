const { defineConfig } = require("cypress")

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',

  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',

    mochaJunitReporterReporterOptions: { mochaFile: 'cypress/reports/junit/results-[hash].xml' },

    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: 'Relatório de testes',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    }
  },

  chromeWebSecurity: false,

  e2e: {
    video: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
})

// require('dotenv').config()

// const { defineConfig } = require('cypress')
// const nodemailer = require('nodemailer')
// const path = require('path')
// const fs = require('fs')

// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter',
  
//   reporterOptions: {
//     reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
//     mochaJunitReporterReporterOptions: { mochaFile: 'cypress/reports/junit/results-[hash].xml' },

//     cypressMochawesomeReporterReporterOptions: {
//       charts: true,
//       reportPageTitle: 'Relatório de testes',
//       embeddedScreenshots: true,
//       inlineAssets: true,
//       saveAllAttempts: false
//     },

//     reportDir: 'cypress/reports/html',
//     overwrite: false,
//     html: true,
//     json: false,
//   },

//   chromeWebSecurity: false,

//   e2e: {
//     video: true,
//     setupNodeEvents(on, config) {
//       require('cypress-mochawesome-reporter/plugin')(on)

//       on('after:run', async () => {
//         const reportPath = path.resolve(__dirname, 'cypress/reports/html/index.html')
//         const reportContent = fs.readFileSync(reportPath, 'utf-8')

//         const transporter = nodemailer.createTransport({
//           host: `smtp.gmail.com`,
//           port: 587,
//           secure: false,
//           auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD,
//           },
//         })

//         fs.readFile(reportPath, (err, data) => {
//           if (err) {
//             console.error('Erro ao ler o relatório:', err)
//             return
//           }

//           const mailOptions = {
//             from: `dev.gbrlsouza@gmail.com`,
//             to: `dev.gbrlsouza@gmail.com`,
//             subject: `Relatório de Testes Cypress`,
//             html: `<h3>Segue o relatório de testes do Cypress</h3>`,
//             attachments: [
//               {
//                 filename: 'relatorio-cypress.html',
//                 content: reportContent && data
//               }
//             ]
//           }

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.log('Erro ao enviar o e-mail:', error)
//             } else {
//               console.log('E-mail enviado:', info.response)
//             }
//           })
//         })
//       })

//       return config
//     },
//   },
// })
