describe('validating angular calculator', () => {
    const calculator = require('../pages/calculatorPage.js');

    beforeAll(() => {
        isAngularSite(true);
        browser.get(browser.params.baseUrl);
    });

    it('should display the title', () => {
        expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should be able to add positive numbers', () => {
        calculator.calculate('4', '25', '+');
        expect(calculator.getResult()).toBe('29');
    });

    it('should be able to add negative numbers', () => {
        calculator.calculate('-4', '25', '+');
        expect(calculator.getResult()).toBe('21');
    });

    it('should be able to subtract positive numbers', () => {
        calculator.calculate('25', '4', '-');
        expect(calculator.getResult()).toBe('21');
    });

    it('should be able to subtract negative numbers', () => {
        calculator.calculate('25', '-4', '-');
        expect(calculator.getResult()).toBe('29');
    });

    it('should be able to multiply numbers', () => {
        calculator.calculate('25', '4', '*');
        expect(calculator.getResult()).toBe('100');
    });

    it('should be able to divide numbers', () => {
        calculator.calculate('25', '5', '/');
        expect(calculator.getResult()).toBe('5');
    });

    it('should be able to get the modulu of two numbers', () => {
        calculator.calculate('25', '4', '%');
        expect(calculator.getResult()).toBe('1');
    });

    it('should have the correct entries in history', () => {
        expect(calculator.objects.history.count()).toEqual(7);
        expect(calculator.objects.history.first().getText()).toContain('25 % 4');
        expect(calculator.objects.history.last().getText()).toContain('4 + 25');
    });
});