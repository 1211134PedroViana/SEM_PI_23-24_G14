module.exports = function(config) {
    config.set({
      frameworks: ['jasmine', '@angular/cli'],
      plugins: [
        require('karma-jasmine'),
        require('@angular/cli/plugins/karma'),
      ],
      browsers: ['Chrome'],
    });
  };