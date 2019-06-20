import 'lazysizes'

/** lazysizes */
document.addEventListener('lazybeforeunveil', function (e) {
    var bg = e.target.getAttribute('data-bg');
    if (bg) {
        var html = document.querySelector('html');
        if (html.classList.contains('webp')) {
            bg = bg.replace(/\.[^/.]+$/, ".webp");
        }
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});

/** background-attachment IE */
if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
    var body = document.querySelector('body');
    body.onwheel = function () {
        event.preventDefault();
        var wd = event.wheelDelta;
        var csp = window.pageYOffset;
        window.scrollTo(0, csp - wd);
    };
}