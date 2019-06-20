const penthouse = require("penthouse");
const fs = require("fs");

penthouse({
    url: 'http://localhost:53185/',
    css: 'all_styles.css',
    width: 320,
    height: 1000,
    keepLargerMediaQueries: true,
    forceInclude: ['.fonts-loaded-1','.fonts-loaded-2']
}).then(criticalCss => {
    // use the critical css
    fs.writeFileSync('critical.css', criticalCss);
})