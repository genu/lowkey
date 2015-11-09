module.exports = function () {
    return {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true
      },
      e2e: {
        configFile: 'karma-e2e.conf.js',
        autoWatch: false,
        singleRun: true
      }
    }
};
