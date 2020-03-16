const penthouse = require("penthouse");
const fs = require("fs");

penthouse({
    url: 'http://localhost:53185/',
    css: 'custom_styles.css',
    width: 320,
    height: 1000,
    keepLargerMediaQueries: true,
    forceInclude: ['.fonts-loaded-2 .secondary-font', '.fonts-loaded-1 .secondary-font', '.secondary-font', '.webp .firstScreen', '.firstScreen:before', '.firstScreen .intro-text', '.firstScreen .intro-text .intro-heading', '.firstScreen .intro-text .intro-heading span', '.navbar', '.container-fluid', '.row', '.column-1', '.column',
        '.fonts-loaded-2 .navbar .navbar-brand', '.navbar .navbar-brand', '.visible-xs', '.navbar .navbar-toggle', '.navbar .navbar-toggle', 'button', '.navbar .navbar-li', '.navbar .navbar-li .navbar-link']
}).then(criticalCss => {
    // use the critical css
    fs.writeFileSync('critical.css', criticalCss);
})