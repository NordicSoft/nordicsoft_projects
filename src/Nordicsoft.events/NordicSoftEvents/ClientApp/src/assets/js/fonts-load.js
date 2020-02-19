(function () {
    "use strict";
    // Optimization for Repeat Views
    if (sessionStorage.fontsLoadedCriticalFoftPreloadFallback) {
        document.documentElement.className += " fonts-loaded-2";
        return;
    } else if ("fonts" in document) {
        //var isCyrillicFonts = document.documentElement.classList.contains("cyrillic");
        var primarySubset = "1em OpenSansSubset";
        //var secondarySubset = isCyrillicFonts ? "1em BloggerSansSubset" : "1em DosisSubset";
        var fontsArray = ["300 1em Open Sans", "400 1em Open Sans", "600 1em Open Sans", "700 1em Open Sans", "800 1em Open Sans"];
        document.fonts.load(primarySubset).then(function () {
            //document.fonts.load(secondarySubset).then(function () {
            document.documentElement.className += " fonts-loaded-1";
            var fontsLoadArray = fontsArray.map(function (item) { return document.fonts.load(item) });
            Promise.all(fontsLoadArray).then(function () {
                document.documentElement.className += " fonts-loaded-2";
                // Optimization for Repeat Views
                sessionStorage.fontsLoadedCriticalFoftPreloadFallback = true;
            });
            // });
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