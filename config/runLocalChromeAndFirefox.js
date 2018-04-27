let _config = require('./baseConfig');
delete _config['capabilities'];
_config['directConnect'] = false;
_config['seleniumAddress'] = 'http://localhost:4444/wd/hub';
_config['multiCapabilities'] = [
	{
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
	{
		browserName: 'firefox',
	},
];
exports.config = _config;

