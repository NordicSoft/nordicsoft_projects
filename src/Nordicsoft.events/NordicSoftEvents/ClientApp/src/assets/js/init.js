$(document).ready(function () {
    //contact-form
    $("#contact-form").on('submit', function (e) {
        e.preventDefault();
        var $form = $(this);
        var siteKey = $("input[name=g-recaptcha-site-key]", $form).val();

        $("button[type=submit]", $form).prop("disabled", true);
        var data = $form.serialize();
        var url = $form.prop("action");
        $.post(url,
            data,
            function (resp) {
                $("button[type=submit]", $form).prop("disabled", false);
                resp.success == true
                    ? $.alert({
                        backgroundDismiss: true,
                        content: "Your message was successfully sent. We will write your back soon!",
                        theme: "my-theme",
                        title: "",
                        onOpen: function () { $('body').addClass('overflow-y') },
                        onClose: function () { $('body').removeClass('overflow-y') }
                    })
                    : $.alert({
                        backgroundDismiss: true,
                        content: "Sorry, we couldn't send your message. Try later!",
                        theme: "my-theme",
                        title: "",
                        onOpen: function () { $('body').addClass('overflow-y') },
                        onClose: function () { $('body').removeClass('overflow-y') }
                    });

                $form.trigger("reset");
            });

    });
    //subscribe
    $("#subscribe-form").on('submit', function (e) {
        e.preventDefault();
        $(this).submit(function () {
            return false;
        });
        var data = $(this).serialize();
        var url = $(this).prop("action");
        var form = this;
        $.post(url, data, function (resp) {
            resp.success == true ?
                $.alert({
                    backgroundDismiss: true,
                    content: "Thank you for subscribing us!",
                    theme: "my-theme",
                    title: "",
                    onOpen: function () { $('body').addClass('jconfirm-noscroll') },
                    onClose: function () { $('body').removeClass('jconfirm-noscroll') }
                })
                :
                $.alert({
                    backgroundDismiss: true,
                    content: "Sorry, we couldn't send your message. Try later!",
                    theme: "my-theme",
                    title: "",
                    onOpen: function () { $('body').addClass('jconfirm-noscroll') },
                    onClose: function () { $('body').removeClass('jconfirm-noscroll') }
                });

            $(':input', form)
                .not(':button, :submit, :reset, :hidden')
                .val('')
                .prop('checked', false)
                .prop('selected', false);
        });
    });

    //lazysizes
    document.addEventListener('lazybeforeunveil', function (e) {
        var bg = e.target.getAttribute('data-bg');
        if (bg) {
            if ($('html').hasClass("webp")) {
                bg = bg.replace(/\.[^/.]+$/, ".webp");
            }
            e.target.style.backgroundImage = 'url(' + bg + ')';
        }
    });

    //auto close navbar-collapse on click a
    $('.navbar a.nav-link').on('click', function () {
        $('.navbar-toggler:visible').click();
    });
    addFixedTop();
    //shrink header
    $(document).on("scroll", function () {
        $(document).scrollTop() > 0 ? $(".navbar-sticky").addClass("fixed-top") : $(".navbar-sticky").removeClass("fixed-top");
    });

    //back to top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({ scrollTop: 0 }, 700);
        });
    }

    //smooth scroll
    smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        offset: 58, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function (anchor, toggle) {
        }
    });

    //counter
    if ($.fn.countdown) {
        var $clock = $('#clock'),
            untilDate = $clock.data('until-date');

        $clock.countdown(untilDate, function (e) {
            $(this).html(e.strftime(''
                + '<div class="col-4 col-sm-2"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large text-right text-center">%D</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large text-center">Days</span></div>'
                + '<div class="col-4 col-sm-2"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large text-center">%H</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large text-center">Hours</span></div>'
                + '<div class="col-4 col-sm-2"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large text-center">%M</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large text-center">Minutes</span></div>'
                + '<div class="col-4 col-sm-2 d-none d-sm-block text-center"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large text-center">%S</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large text-center">Seconds</span></div>'));
        });
    }

    //background-attachment IE
    if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
        $('body').on("mousewheel", function () {
            event.preventDefault();
            var wd = event.wheelDelta;
            var csp = window.pageYOffset;
            window.scrollTo(0, csp - wd);
        });
    }

    var $inputPhone = $("input[name='phone']");
    var $valuePhone = $inputPhone.val();
    $inputPhone.on('keyup', function () {
        var numStr = "0123456789";
        var k = 0;
        var data = $(this).val();
        for (var i = 0; i < data.length; i++) {
            var thisChar = data.substring(i, i + 1);
            if (numStr.indexOf(thisChar) !== -1) k++;
        }
        if (k !== data.length) {
            var newData = data.replace(/\D/g, "");
            $(this).val($valuePhone + newData);
        }
    });

    $('body').scrollspy({
        target: '.navbar',
        offset: 60
    });

    function addFixedTop() {
        if ($(document).scrollTop() > 0) $(".navbar-sticky").addClass("fixed-top");
    }

});