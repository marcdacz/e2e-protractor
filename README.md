# e2e-protractor-node
End-to-end test automation template utilising Protractor

[![protractor logo](http://www.protractortest.org/img/protractor-logo-450.png)](http://www.protractortest.org/#/)

### Installation:
Install node.js then:
```sh
$ cd e2e-protractor-node
$ npm install
```

### Execution:
I have included a launch option for vscode following this [guide](https://blogs.msdn.microsoft.com/wushuai/2016/08/24/debug-protractor-script-in-visual-studio-code/) which will allow you to select it and hit F5 to execute and debug the tests.
![vscode debug](https://msdnshared.blob.core.windows.net/media/2016/08/vscode2-1024x460.png)

To run manually from the terminal:
```sh
$ cd .\e2e-protractor-node\config
$ protractor runLocal.js
```

### Folder Structure:
1. config
    - contains the protractor configurations which you can call from the vscode launch options I mentioned above.
2. data
    - contains json files such as `testSettings.json` where you can write specific settings for the tests.
3. pages
    - contains the page object models for pages, userflows or common components (ie. `calculatorPage.js`, `loginUserflow.js` or `navbarComponent.js`).
4. specs
    - contains the test specs; I recommend placing them in subfolders for better organisation and navigation
5. utils
    - contains helper functions that can be used all throughout the framework 

### ToDos:
- Play around with async/await to make asynchronous tests be more readable
- Add screenshots/video for failed tests



