let disableNgAnimate = () => {
    angular
        .module('disableNgAnimate', [])
        .run(['$animate', function($animate) {
            $animate.enabled(false);
        }]);
};

let disableCssAnimate = () => {
    angular
        .module('disableCssAnimate', [])
        .run(() => {
            let style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '* {' +
                '-webkit-transition: none !important;' +
                '-moz-transition: none !important' +
                '-o-transition: none !important' +
                '-ms-transition: none !important' +
                'transition: none !important' +
                '}';
            document.getElementsByTagName('head')[0].appendChild(style);
        });
};

let initialiseGlobalVariables = () => {
    global.testConfig = require('../data/testSettings.json');
    global.webUrl = testConfig.webUrl;
    global.helpers = require('../utils/helpers.js');
    global.format = require('string-format');
    global.isAngularSite = function(flag) {
        browser.ignoreSynchronization = !flag;
        global.implicitTimeoutInMs = flag ? 10000 : 30000;
        browser.driver.manage().timeouts().implicitlyWait(implicitTimeoutInMs);
    };
    global.until = protractor.ExpectedConditions;
    global.defaultWait = 10000;
};

let disableAnimation = () => {        
    browser.addMockModule('disableNgAnimate', disableNgAnimate);
    browser.addMockModule('disableCssAnimate', disableCssAnimate);
};

module.exports = {
    initialiseGlobalVariables,
    disableAnimation
};

