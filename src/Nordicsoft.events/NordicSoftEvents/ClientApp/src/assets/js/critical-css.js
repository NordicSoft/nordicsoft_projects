const penthouse = require("penthouse");
const fs = require("fs");

penthouse({
    url: 'http://localhost:53185',
    css: 'all_styles.css'
}).then(criticalCss => {
// use the critical css
    fs.writeFileSync('critical.css', criticalCss);
})
