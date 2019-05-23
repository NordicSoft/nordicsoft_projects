/** Document ready */
$(document).ready(function () {
    'use strict';

    /** carousel */
    $('.owl-carousel-wishes').owlCarousel({
        navigation: false,
        pagination: true,
        autoPlay: 8000,
        loop: true
    });
    $('.owl-carousel-partners').owlCarousel({
        items: 3,
        navigation: false,
        pagination: true,
        autoPlay: 8000,
        loop: true
    });

    /** lazysizes */
    document.addEventListener('lazybeforeunveil', function (e) {
        var bg = e.target.getAttribute('data-bg');
        if (bg) {
            e.target.style.backgroundImage = 'url(' + bg + ')';
        }
    });

    /** animated only if not at top of page on load */
    var $win = $(window);
    if ($win.scrollTop() === 0)
        jQuery('.navbar-fixed-top').addClass('wow');
    else if ($win.height() + $win.scrollTop() === $(document).height()) {
        jQuery('.navbar-fixed-top').removeClass('wow');
    }

    /** scroll to top */
    $('a.page-scroll').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    /** submit */
    $("#contact-form").on('submit', function (e) {
        e.preventDefault();
        var $form = $(this);
        grecaptcha.execute('6LefMp0UAAAAAIVYD-sYPIn4ZD0W6kZh5gdvsDsq', { action: 'contact' }).then(function (token) {
            $("input[name=g-recaptcha-response-token]", $form).val(token);
            $("input[name=g-recaptcha-action]", $form).val("contact");
        }).then(function () {
            var data = $form.serialize();
            var url = $form.prop("action");

            return $.post(url, data);

        }).then(function (resp) {
            resp.success == true
                ? $.alert({ content: "Your message was successfully sent. We will write your back soon!", theme: "my-theme", title: "" })
                : $.alert({ content: "Sorry, we couldn't send your message. Try later!", theme: "my-theme", title: "" });
            $form.trigger("reset");
        });
    });

    //background-attachment IE
    if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
        $('body').on("mousewheel", function () {
            event.preventDefault();
            var wd = event.wheelDelta;
            var csp = window.pageYOffset;
            window.scrollTo(0, csp - wd);
        });
    }

    /** fullscreen fix */
    var windowHeight = $(window).innerHeight();
    var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobileDevice) {
        $('#headerwrap.fullheight').css('height', windowHeight);
        $(window).resize(function() {
            $('#headerwrap.fullheight').css('height', windowHeight);
        });
    }

    // closes the Responsive Menu on Menu Item Click
    $('.header-fixed-top .navbar-collapse ul li a').on('click', function () {
        $('.navbar-toggle:visible').click();
    });

    function hasWebP() {
        var rv = $.Deferred();
        var img = new Image();
        img.onload = function () { rv.resolve(); };
        img.onerror = function () { rv.reject(); };
        img.src = '/img/bg/bg3.webp';
        return rv.promise();
    }

    hasWebP().then(function () {
        $('body').addClass('webp');
    }, function () {
        $('body').addClass('jpeg');
    });
});