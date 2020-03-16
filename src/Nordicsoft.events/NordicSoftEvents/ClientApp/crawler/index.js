var supercrawler = require("supercrawler");
const penthouse = require("penthouse");
const puppeteer = require('puppeteer') // installed by penthouse
const fs = require("fs");
const path = require("path");
var getCss = require('get-css');


// 1. Create a new instance of the Crawler object, providing configuration
// details. Note that configuration cannot be changed after the object is
// created.
var crawler = new supercrawler.Crawler({

  // Tme (ms) between requests
  interval: 1000,
  // Maximum number of requests at any one time.
  concurrentRequestsLimit: 5,
  // Time (ms) to cache the results of robots.txt queries.
  robotsCacheTime: 3600000,
  // Query string to use during the crawl.
  userAgent: "Mozilla/5.0 (compatible; supercrawler/1.0; +https://github.com/brendonboshell/supercrawler)",
  // Custom options to be passed to request.
  request: {
    strictSSL: false,
    rejectUnauthorized: false,
    headers: {
      'CriticalCssCrawler': 'true'
    }
  }
});

async function getViewPort(url) {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  await page.goto(url);

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);

  await browser.close();

  return dimensions;
}


console.log("crawler created")
// Get "Sitemaps:" directives from robots.txt
crawler.addHandler(supercrawler.handlers.robotsParser());

// Crawl sitemap files and extract their URLs.
crawler.addHandler(supercrawler.handlers.sitemapsParser());

// Custom content handler for HTML pages.
crawler.addHandler("text/html", function (context) {
  var sizeKb = Buffer.byteLength(context.body) / 1024;
  var url = context.url;
  //var output = context.$("title").text().split("|")[0].trim().split(" ").join("-").concat(".css"); 
  var output = context.$("html").data("id-view").concat(".css"); //only for nordicsoft.net


  var pageCss;
  getCss(url, { timeout: 5000, ignoreCerts: true })
    .then(function (response) {
      pageCss = response.links.map(a => a.css).join("\n");
      return penthouse({
        url: url,
        forceInclude: [/^\.fonts-loaded-2/i, /^\.fonts-loaded-1/i],
        cssString: response.links.map(a => a.css).join("\n"), //response.css //globalCss
        keepLargerMediaQueries: true,
        width: 2560,
        height: 1080
      })
    })
    .then(criticalCss => {
      // use the critical css
      var filePath = './critical'.concat(output);
      var pathArray = filePath.split('/');
      var filename = pathArray.pop();
      var folderPath = pathArray.join('/');
      fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) throw err;
        fs.writeFileSync(filePath, criticalCss);
        console.log("write critical to ", output);

      });
    })
    .then(() => { return getViewPort(url) })
    .then(pageDimensions => {
      return penthouse({
        url: url,
        forceInclude: [/^\.fonts-loaded-2/i, /^\.fonts-loaded-1/i],
        cssString: pageCss, //response.css //globalCss
        keepLargerMediaQueries: true,
        width: pageDimensions.width,
        height: pageDimensions.height
      })

    })
    .then(criticalCss => {
      // use the critical css
      var filePath = './page-css'.concat(output);
      var pathArray = filePath.split('/');
      var filename = pathArray.pop();
      var folderPath = pathArray.join('/');
      fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) throw err;
        fs.writeFileSync(filePath, criticalCss);
        console.log("write page-css to ", output);

      });
    })
    .catch(function (error) {
      console.error(error);
    });
  console.log("Processed", context.url, "Size=", sizeKb, "KB");
});


var host = 'http://localhost:53185'//process.argv[2];  //homepage url 
crawler.getUrlList()
  .insertIfNotExists(new supercrawler.Url('https://192.168.11.25:9001'))
  .then(function () {
    return crawler.start();
  }).catch(function (e) {
    console.log(e);
  })




