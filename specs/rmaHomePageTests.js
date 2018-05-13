describe('validating reponsive page', () => {

	beforeAll(() => {
		isAngularSite(true);
		browser.get(browser.params.rmaUrl);
	});

	const fs = require('fs');
	let writeScreenShot = (data, filename) => {
		var stream = fs.createWriteStream(filename);
		stream.write(new Buffer(data, 'base64'));
		stream.end();
	};

	const looksSame = require('looks-same');
	let windowWidths = [400, 1024, 1920];
	windowWidths.map((w) => {
		fit(`should correctly display page in width: ${w}`, (done) => {
			browser.manage().window().setSize(w, 1000);
			browser.takeScreenshot()
				.then((png) => {
					let filename = `rmaHomePage_${w}`;
					let actualImage = `${filename}.png`;
					let expectedImage = `${filename}_baseline.png`;
					let diffImage = `${filename}_diff.png`;
					writeScreenShot(png, actualImage);

					looksSame(actualImage, expectedImage, (error, equal) => {
						expect(equal, `Validating image ${filename}`).toBe(true);

						if (equal != true) {
							looksSame.createDiff({
								reference: expectedImage,
								current: actualImage,
								diff: diffImage,
								highlightColor: '#FFFF00',
								strict: false,
								tolerance: 2.5
							}, (error) => { });
						}
						
						done();
					});
				});
		});
	});
});