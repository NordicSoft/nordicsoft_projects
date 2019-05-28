(function ($) {
    "use strict";

    var $document = $(document),
        $window = $(window),
        $htmlBody = $('html, body'),
        $body = $('body'),
        $header = $('header'),
        $navbar = $('.navbar'),
        $navbarCollapse = $('.navbar-collapse'),
        $pageScrollLink = $('.page-scroll'),
        $galleryGrid = $('.gallery-grid'),
        $scrollToTop = $('.scroll-to-top'),
        navHeight = 90,
        navHeightShrink = 60;

    /** Detect mobile device */
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    /** Window load */

    $window.on('load', function () {
        /** Bootstrap scrollspy */
        var ww = Math.max($window.width(), window.innerWidth);
        $body.scrollspy({
            target: '#navigation',
            offset: ww > 992 ? navHeightShrink : navHeight
        });
    });


    /** Document ready */

    $document.ready(function () {

        /** contact form */
        $("#contact-form").on('submit', function (e) {
            e.preventDefault();
            var $form = $(this);
            var siteKey = $("input[name=g-recaptcha-site-key]", $form).val();
            $("button[type=submit]", $form).prop("disabled", true);
            grecaptcha.execute(siteKey,{
                action: 'contact' 
            }).then(function (token) {
                $("input[name=g-recaptcha-response-token]", $form).val(token);
                $("input[name=g-recaptcha-action]", $form).val("contact");
            }).then(function () {
                var data = $form.serialize();
                var url = $form.prop("action");

                return $.post(url, data).catch(function(e) {console.log(e)});

            }).then(function (resp) {
                $("button[type=submit]", $form).prop("disabled", false);
                resp.success == true
                    ? $.alert({ content: "Your message was successfully sent. We will write your back soon!", theme: "my-theme", title: "" })
                    : $.alert({ content: "Sorry, we couldn't send your message. Try later!", theme: "my-theme", title: "" });

                $form.trigger("reset");
            });

        });

        /** lazysizes */
        document.addEventListener('lazybeforeunveil', function (e) {
            var bg = e.target.getAttribute('data-bg');
            if (bg) {
                e.target.style.backgroundImage = 'url(' + bg + ')';
            }
        });

        /** window scroll */
        $window.on('scroll', function () {

            if ($document.scrollTop() > navHeight) {

                /** Shrink navigation */
                $header.addClass('shrink');
                $navbar.addClass('shrink');

                /** Scroll to top */
                $scrollToTop.fadeIn();
            }
            else {

                /** Shrink navigation */
                $header.removeClass('shrink');
                $navbar.removeClass('shrink');

                /** Scroll to top */
                $scrollToTop.fadeOut();
            }
        });


        /** resize */
        $window.on('resize', function () {

            /** Bootstrap scrollspy */
            var dataScrollSpy = $body.data('bs.scrollspy'),
                ww = Math.max($window.width(), window.innerWidth),
                offset = ww > 992 ? navHeightShrink : navHeight;

            dataScrollSpy._config.offset = offset;
            $body.data('bs.scrollspy', dataScrollSpy);
            $body.scrollspy('refresh');

        });


        /** page scroll */
        $pageScrollLink.on('click', function (e) {
            var anchor = $(this),
                target = anchor.attr('href');
            pageScroll(target);
            e.preventDefault();
        });

        function pageScroll(target) {
            var ww = Math.max($window.width(), window.innerWidth),
                offset = ww > 992 ? navHeightShrink : navHeight;

            $htmlBody.stop().animate({
                scrollTop: $(target).offset().top - (offset - 1)
            }, 1000, 'easeInOutExpo');

            // Automatically retract the navigation after clicking on one of the menu items.
            $navbarCollapse.collapse('hide');
        };

        /** gallery - magnific popup */
        if ($.fn.magnificPopup) {
            $galleryGrid.magnificPopup({
                delegate: 'a',
                type: 'image',
                mainClass: 'mfp-fade',
                fixedContentPos: true,
                overflowY: 'hidden',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 2],
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter-curr">%curr%</span> of <span class="mfp-counter-total">%total%</span>'
                }
            });
        }


        /** countdown */
        if ($.fn.countdown) {
            var $clock = $('#clock'),
                untilDate = $clock.data('until-date');

            $clock.countdown(untilDate, function (e) {
                $(this).html(e.strftime(''
                    + '<div class="col-4 col-sm-3 col-lg-2 border-gray-300 border-right text-center"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large">%D</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large">Days</span></div>'
                    + '<div class="col-4 col-sm-3 col-lg-2 border-gray-300 border-right text-center"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large">%H</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large">Hours</span></div>'
                    + '<div class="col-4 col-sm-3 col-lg-2 border-gray-300 border-sm-right text-center"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large">%M</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large">Minutes</span></div>'
                    + '<div class="col-4 col-sm-3 col-lg-2 d-none d-sm-block text-center"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large">%S</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large">Seconds</span></div>'));
            });
        }


        /** carousel */
        if ($.fn.flickity) {

            /** Carousel - Love Story */
            var $carouselLoveStory = $('#carousel-love-story');
            carouselCustom($carouselLoveStory);

            var $flickityPageDots = $carouselLoveStory.find('.flickity-page-dots').children();
            $flickityPageDots.each(function ($i) {
                var num = ($i + 1 < 10) ? '0' + ($i + 1) : ($i + 1);
                $(this).html('<span class="page" data-index="' + $i + '"><span class="page-dots fa-icons fac-heart"></span><span class="page-number font-alt2 text-medium text-sm-extra-large">' + num + '</span></span>');
            });

            var $flickityPageNumber = $flickityPageDots.find('.page');
            $flickityPageNumber.on('click', function () {
                var index = $(this).data('index');
                $carouselLoveStory.flickity('select', index);
            });
        }


        /** carousel Custom */
        function carouselCustom($elem) {
            $elem.flickity({
                cellSelector: '.carousel-cell',
                cellAlign: 'left',
                contain: true,
                prevNextButtons: $elem.data('prev-next-buttons'),
                pageDots: $elem.data('page-dots'),
                draggable: $elem.data('draggable'),
                autoPlay: $elem.data('autoplay'),
                imagesLoaded: true,
                pauseAutoPlayOnHover: false,
                wrapAround: $elem.data('wrap-around'),
                lazyLoad: true
            });

            var flkty = $elem.data('flickity');

            flkty.on('lazyLoad.flickity', function (event, cellElement) {
                var img = event.originalEvent.target;
                console.log(event.originalEvent.type, img.src);
            });

            if ($elem.data('autoplay')) {
                var flkty = $elem.data('flickity');
                $elem.find('.flickity-prev-next-button').on('mouseleave', function () {
                    flkty.playPlayer();
                });
            }
        }
    });
    function hasWebP() {
        var rv = $.Deferred();
        var img = new Image();
        img.onload = function () { rv.resolve(); };
        img.onerror = function () { rv.reject(); };
        img.src = '/img/andrew_helen_google_image.webp';
        return rv.promise();
    }

    hasWebP().then(function () {
        $('body').addClass('webp');
    }, function () {
        $('body').addClass('jpeg');
    });
})(jQuery);