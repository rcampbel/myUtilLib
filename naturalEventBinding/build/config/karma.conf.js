module.exports = function(config) {
    "use strict";

    //This is here because the first time it calls in there is on config.set but the second time there is.
    if (config.set) {
        config.set({

            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '../../',

            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['jasmine'],

            // list of files / patterns to load in the browser
            files: [
               'src/**/*.js','test/**/*.spec.js', 'lib/**/*.js'
            ],


            // list of files to exclude
            exclude: [],

            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['progress', 'coverage','clear-screen', 'html'],


            coverageReporter: {
                type: 'html',
                dir: 'build/coverage/'
            },

            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_WARN,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,


            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: ['Chrome'],


            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: false
        });
    }
};
