const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const fs = require('fs');

const cleanup = () => {
	fs.readdir(rootDir, (err, list) => {
		list
			.filter((file) => file.indexOf('e2e-testresults') > -1)
			.forEach((fileName) => {
				fs.unlinkSync(fileName);
			});
	});
};

let baseConfig = {
	params: {
		calcUrl: 'http://juliemr.github.io/protractor-demo/',
		rmaUrl: 'https://www.ratemyagent.com.au/'
	},
	directConnect: true,
	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: ['--start-maximized'],
			prefs: {
				'credentials_enable_service': false,
				'profile': {
					password_manager_enabled: false
				},
				'download': {
					prompt_for_download: false,
					default_directory: `${rootDir}/downloads`,
				}
			}
		}
	},
	framework: 'jasmine2',
	specs: ['../specs/**/*.js'],
	jasmineNodeOpts: {
		defaultTimeoutInterval: 300000,
		restartBrowserBetweenTests: true
	},
	allScriptsTimeout: 60000,
	onPrepare: function() {
		cleanup();

		const testInitialiser = require('../utils/init.js');
		testInitialiser.initialiseGlobalVariables();
		testInitialiser.disableAnimation();
		testInitialiser.updateEnvironmentProperties();

		const jasmineReporters = require('jasmine-reporters');
		jasmine.getEnv().addReporter(new jasmineReporters.NUnitXmlReporter({ filename: `e2e-testresults_${helpers.getTimestamp()}.xml` }));

		const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
		jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));

		jasmine.getEnv().addReporter({
			specStarted(result) {
				global.testCaseResult = result;
			},
			specDone() {
				global.testCaseResult = null;
			}
		});

		var AllureReporter = require('jasmine-allure-reporter');
		jasmine.getEnv().addReporter(new AllureReporter({ resultsDir: 'allure-results' }));
		jasmine.getEnv().afterEach((done) => {			
			if (testCaseResult.failedExpectations.length) {
				browser.takeScreenshot().then((png) => {
					allure.createAttachment('Screenshot', () => {
						return new Buffer(png, 'base64')
					}, 'image/png')();
					done();
				});
			} else {
				done();
			}
		});
	},
	onComplete: function() {
		cleanup();
	}
};

module.exports = baseConfig;
