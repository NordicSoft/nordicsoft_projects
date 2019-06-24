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