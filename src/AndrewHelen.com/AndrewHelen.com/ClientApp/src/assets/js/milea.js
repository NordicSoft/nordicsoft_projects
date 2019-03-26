$(document).ready(function () {
    $("#contact-form").on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        var url = $(this).prop("action");
        var form = this;
        $.post(url, data, function (resp) {
            resp.success == true ? $.alert({ content: "Your message was successfully sent. We will write your back soon!", theme: "my-theme", title: "" }) : $.alert({ content: "Sorry, we couldn't send your message. Try later!", theme: "my-theme", title: "" });

            $(':input', form)
                .not(':button, :submit, :reset, :hidden')
                .val('')
                .prop('checked', false)
                .prop('selected', false);
        });
    });

    //var oldFlickityCreate = $('.gallery-wrapper').data('flickity');
    //oldFlickityCreate = function () {
    //    var that = this;
    //    if (this.element.addEventListener) {
    //        this.element.addEventListener('load', function () {
    //            that.onresize();
    //        }, true);
    //    }
    //    this._create = oldFlickityCreate;
    //    return oldFlickityCreate.apply(this, arguments);
    //};

    document.addEventListener('lazybeforeunveil', function (e) {
        var bg = e.target.getAttribute('data-bg');
        if (bg) {
            e.target.style.backgroundImage = 'url(' + bg + ')';
        }
    });

    //function lazyBackgrounds() {
    //    var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

    //    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
    //        let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
    //            entries.forEach(function (entry) {
    //                if (entry.isIntersecting) {
    //                    entry.target.classList.add("visible");
    //                    lazyBackgroundObserver.unobserve(entry.target);
    //                }
    //            });
    //        });

    //        lazyBackgrounds.forEach(function (lazyBackground) {
    //            lazyBackgroundObserver.observe(lazyBackground);
    //        });
    //    }
    //}

    //lazyBackgrounds();
});