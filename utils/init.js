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

let updateEnvironmentProperties = () => {
    const parser = require("properties-file");
    const properties = parser.stringify({
        Browser: "Chrome",
        BrowserVersion: "63.0",
        Environment: "Production",
        WebVersion: "1.0.4"
    });
    const fs = require('fs');
    fs.writeFileSync("allure-results/environment.properties", properties);
};

module.exports = {
    initialiseGlobalVariables,
    disableAnimation,
    updateEnvironmentProperties
};

