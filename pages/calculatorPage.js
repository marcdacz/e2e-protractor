let objects = {
    firstValue: element(by.model('first')),
    secondValue: element(by.model('second')),
    operator: element(by.model('operator')),
    goButton: element(by.id('gobutton')),
    resultValue: element(by.binding('latest')),
    history: element.all(by.repeater('result in memory'))
};

let calculate = (firstValue, secondValue, operator) => {
    objects.firstValue.sendKeys(firstValue);
    objects.secondValue.sendKeys(secondValue);
    objects.operator.sendKeys(operator);
    objects.goButton.click();
};

let getResult = () => objects.resultValue.getText();

module.exports = {
    objects,
    calculate,
    getResult
};
