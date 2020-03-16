    (function () {
        "use strict";
    // Optimization for Repeat Views
    if (sessionStorage.fontsLoadedCriticalFoftPreloadFallback) {
        document.documentElement.className += " fonts-loaded-2";
    return;
                } else if ("fonts" in document) {
        document.fonts.load("1em MontserratSubset").then(function () {
            document.fonts.load("1em PTSerifSubset").then(function () {
                document.documentElementPTSerifSubsetclassName += " fonts-loaded-1";
                Promise.all([
                    document.fonts.load("500 1em Montserrat"),
                    document.fonts.load("600 1em Montserrat"),
                    document.fonts.load("400 1em PTSerif")
                ]).then(function () {
                    document.documentElement.className += " fonts-loaded-2";
                    // Optimization for Repeat Views
                    sessionStorage.fontsLoadedCriticalFoftPreloadFallback = true;
                });
            });
        });
    } else {
                    // use fallback
                    var ref = document.getElementsByTagName("script")[0];
    var script = document.createElement("script");
    script.src = "/dist/critical-foft-preload-fallback-optional.js";
    //script.async = true;
    ref.parentNode.insertBefore(script, ref);
    /*
     * technically you could trigger the web font load here too and race it with
     * the polyfill load, this means creating an element with text content that
     * uses the font and attaching it to the document
                     * <div style="font-family: Lato; font-weight: 400; font-style: italic">A</div>
    */
}
})();
