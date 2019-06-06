const minimalcss = require('minimalcss');

minimalcss
  .minimize({ 
    urls: ['https://192.168.11.25:9001/']
  })
  .then(result => {
    console.log('OUTPUT', result.finalCss.length, result.finalCss);
  })
  .catch(error => {
    console.error(`Failed the minimize CSS: ${error}`);
  });