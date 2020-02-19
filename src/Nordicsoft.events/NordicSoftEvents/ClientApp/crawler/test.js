const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.goto('https://192.168.11.25:9001');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);

  await browser.close();
})();