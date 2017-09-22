exports.config = {
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--start-maximized'],
            prefs: {
                credentials_enable_service: false,
                profile: {
                    password_manager_enabled: false
                }
            }
        }
    },
    framework: 'jasmine2',
    specs: ['../specs/**/*.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000
    },
    allScriptsTimeout: 60000,
    onPrepare: function() {
        const jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.NUnitXmlReporter({ filename: 'e2e-testresults.xml' }));

        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));

        const testInitialiser = require('../utils/init.js');
        testInitialiser.initialiseGlobalVariables();
        testInitialiser.disableAnimation();
    }
};
