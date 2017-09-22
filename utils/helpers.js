let pad2 = (number) => (number < 10 ? '0' : '') + number;

let getDate = (date, monthNames) => {
    let someDate = new Date();
    if (date !== undefined) someDate = date;
    let dateStr = '' +
        pad2(someDate.getDate()) + ' ' +
        monthNames[someDate.getMonth()] + ' ' +
        someDate.getFullYear();
    return dateStr;
};

let getDateShortMonth = (date) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return getDate(date, monthNames);
};

let getDateLongMonth = (date) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return getDate(date, monthNames);
};

let getTimestamp = () => {
    let currentdate = new Date();
    let datetime = '' +
        currentdate.getFullYear() +
        pad2(currentdate.getMonth() + 1) +
        pad2(currentdate.getDate()) +
        pad2(currentdate.getHours()) +
        pad2(currentdate.getMinutes()) +
        pad2(currentdate.getSeconds());
    return datetime;
};

let toProperCase = (str) => {
    if (str === undefined) str = '';
    return str.replace(/\b\w+/g, function(s) {
        return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
    });
};

let setBrowserImplicitWait = (timeoutInMs) => browser.driver.manage().timeouts().implicitlyWait(timeoutInMs);
let checkElementHasClass = (elem, cls) => elem.getAttribute('class').then((classes) => classes.split(' ').indexOf(cls) !== -1);
let waitUntilElementIsPresent = (elem) => browser.wait(until.presenceOf(elem), defaultWait);
let waitUntilElementIsVisible = (elem) => browser.wait(until.visibilityOf(elem), defaultWait);
let waitUntilElementTextIsAsExpected = (elem, text) => browser.wait(until.textToBePresentInElement(elem, text), defaultWait);

let waitUntilElementIsNotVisible = (elem) => {
    setBrowserImplicitWait(1000);
    browser.wait(until.not(until.visibilityOf(elem)), defaultWait);
    setBrowserImplicitWait(implicitTimeoutInMs);
};

let waitUntilElementIsClickable = (elem) => {
    waitUntilElementIsVisible(elem);
    browser.wait(until.elementToBeClickable(elem), defaultWait);
};

let waitThenClick = (elem) => {
    waitUntilElementIsClickable(elem);
    elem.click();
};

let waitUntilUrlIsAsExpected = (expectedUrl) => {
    let urlChanged = () => {
        browser.getCurrentUrl()
            .then((currentUrl) => {
                return currentUrl === expectedUrl;
            });
    };
    browser.wait(urlChanged, defaultWait);
};

let checkIfElementIsVisible = (elem) => {
    setBrowserImplicitWait(1000);
    let visibleFlag = false;
    if (elem === undefined) {
        visibleFlag = false;
    } else {
        elem.isPresent()
            .then(function(isVisible) {
                visibleFlag = isVisible;
            });
    }
    setBrowserImplicitWait(implicitTimeoutInMs);
    return visibleFlag;
};

let toggleCheckBox = (checkBox, enabled) => {
    if (enabled) {
        checkElementHasClass(checkBox, 'ng-empty').then((hasClass) => {
            if (hasClass) checkBox.sendKeys(protractor.Key.SPACE);
        });
    } else {
        checkElementHasClass(checkBox, 'ng-not-empty').then((hasClass) => {
            if (hasClass) checkBox.sendKeys(protractor.Key.SPACE);
        });
    }
};

require('node-fetch');  

let fetchJson = (url) => fetch(url)
    .then((res) => res.json())
    .catch((error) => Promise.reject('An error occurred while fetching json file from ' + url + '.\n' + error));

let postJson = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((error) => Promise.reject('An error occurred while posting json file to ' + url + '.\n' + error));
};

let urlHelper = function(address) {
    let currentUrl = address;
    this.addQuery = function(parameter, value) {
        currentUrl = !currentUrl.includes('?') ? `${currentUrl}?` : `${currentUrl}&`;
        currentUrl = `${currentUrl + parameter}=${value}`;
        return this;
    };
    this.getAddress = (parameter, value) => currentUrl;
};

module.exports = {
    setBrowserImplicitWait,
    checkElementHasClass,
    checkIfElementIsVisible,
    waitUntilElementIsPresent,
    waitUntilElementIsVisible,
    waitUntilElementTextIsAsExpected,
    waitUntilElementIsNotVisible,
    waitUntilElementIsClickable,
    waitThenClick,
    waitUntilUrlIsAsExpected,
    toggleCheckBox,
    fetchJson,
    postJson,
    getDateShortMonth,
    getDateLongMonth,
    getTimestamp,
    toProperCase,
    urlHelper
};
