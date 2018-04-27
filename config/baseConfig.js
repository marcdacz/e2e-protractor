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
		baseUrl: 'http://juliemr.github.io/protractor-demo/'
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

		const jasmineReporters = require('jasmine-reporters');
		jasmine.getEnv().addReporter(new jasmineReporters.NUnitXmlReporter({ filename: `e2e-testresults_${helpers.getTimestamp()}.xml` }));

		const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
		jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));
	},
	onComplete: function() {
		cleanup();
	}
};

module.exports = baseConfig;
