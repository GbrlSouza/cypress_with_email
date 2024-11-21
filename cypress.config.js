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
      
      on('after:run', (results) => {
        if (results.totalFailed > 0) {
          console.log('Um ou mais testes falharam. Gerando relatório...')
          require('cypress-mochawesome-reporter').generateReport()
        } else { console.log('Todos os testes passaram. Relatório não será gerado.') }
      })
    }
  }
})
