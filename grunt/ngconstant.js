module.exports = function() {
  return {
    options: {
      space: '  ',
      wrap: '"use strict";\n\n {%= __ngModule %}',
      name: 'app.environment',
      dest: '<%= tmp %>/js/environment.js'
    },
    development: {
      constants: {
        ENV: {
          ACCOUNTS_API: "https://still-plateau-1609.herokuapp.com",
          STRIPE_PUBLISHABLE_KEY: "pk_test_pPCUGhcrYxxC2VAnRtQ5e5fK",
          PARSE_APPLICATION_ID: "2Jj90cq6pWcVAVGJfTBFmZRicOYlcANheJ2UoIYm",
          PARSE_RESTAPIKEY: "LQgTHMNRWA54D2lvJkmLlh2ZwL8QGrjiik2vg25W"
        }
      }
    },
    production: {
      constants: {
        ENV: {
          API_URL: "HTTP://PROD_API",
          STRIPE_PUBLISHABLE_KEY: "pk_live_cyxmimc4cPAzy9VuCHiPhTDO"
        }
      }
    }
  }
};
