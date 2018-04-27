# e2e-protractor-node
End-to-end test automation template utilising Protractor

[![protractor logo](http://www.protractortest.org/img/protractor-logo-450.png)](http://www.protractortest.org/#/)

### Features:
- Page Object Model 
- Test Reporting
- Several Utilities and Helper Functions
- VSCode Debugging

### Installation:
Install node.js then:
```sh
$ cd e2e-protractor-node
$ npm install
$ npm run webdriver-update
```

### Execution:
CLI:
1. To Run Chrome Direct
```
$ npm run chrome
```
2. To Run Chrome and Firefox in Parallel
Note: Make sure to install Java JDK
```
$ npm run webdriver-start
$ npm run chrome-firefox
```

VSCode Launch:

I have included a launch option for vscode following this [guide](https://blogs.msdn.microsoft.com/wushuai/2016/08/24/debug-protractor-script-in-visual-studio-code/) which will allow you to select it and hit F5 to execute and debug the tests.
![vscode debug](https://msdnshared.blob.core.windows.net/media/2016/08/vscode2-1024x460.png)

### Test Reporting:
Using jasmine-allure-reporter and allure-commandline
1. To cleanup existing results before testing:
```
$ npm run pretest
```

2. To create report after a test:
```
$ npm run postest
```

3. To open the report:
```
$ npm run open-report
```

### Folder Structure:
1. config
    - contains the protractor configurations which you can call from the vscode launch options I mentioned above.
2. pages
    - contains the page object models for pages, userflows or common components (ie. `calculatorPage.js`, `loginUserflow.js` or `navbarComponent.js`).
3. specs
    - contains the test specs; I recommend placing them in subfolders for better organisation and navigation
4. utils
    - contains helper functions that can be used all throughout the framework 

### ToDos:
- Play around with async/await to make asynchronous tests be more readable
- Add screenshots/video for failed tests



