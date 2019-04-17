var jconfirm = require('jquery-confirm');
import 'lazysizes'

jconfirm.defaults = {
    theme: 'my-theme',
    useBootstrap: false
};


(function ($) {
    "use strict";

    // Required code to run the OWL CAROUSEL (TESTIMONALS) Section
    //*******************
    $('#testimonials-slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    $('#inner_slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    })
    $('#inner_slider_alt').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })


    // Only enable if the document has a long scroll bar
    // Note the window height + offset
    if (($(window).height() + 100) < $(document).height()) {
        $('#top-link-block').removeClass('hidden').affix({
            // how far to scroll down before link "slides" into view
            offset: {
                top: 100
            }

        });
        $('#top-link-block').click(function () {
            $('html,body').animate({
                scrollTop: 0
            }, 'slow');
            return false;
        });
    }

    //var userFeed = new Instafeed({
    //    get: 'user',
    //    userId: '3078908783',
    //    accessToken: '3078908783.1677ed0.330e7b08817e4230a9fa625f9bd0b16a',
    //    //limit: 6,
    //    sortBy: 'random',
    //    resolution: 'low_resolution',
    //    template: '<a href="{{link}}"><img src="{{image}}" /></a>'
    //});
    //userFeed.run();

    $(document).ready(function () {
        //Vertical Tab
        $('#parentVerticalTab').easyResponsiveTabs({
            type: 'vertical', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            closed: 'accordion', // Start closed if in accordion view
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function (event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo2');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });

        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top )
            }, 1250);
            event.preventDefault();
        });

        // Highlight the top nav as scrolling occurs
        $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: 50
        });

        // Offset for Main Navigation
        $('#mainNav').affix({
            offset: {
                top: 100
            }
        })
        $('#main_nav_alt').affix({
            offset: {
                top: 100
            }
        })
        $('.animate').scrolla({
            mobile: false,
            once: false
        });


    });

    // Portfolio and Portfolio Filter Styles
    //*******************
    // Portfolio Masonry
    $(document).ready(function () {
        if ($('#portfolio-masonry').length > 0) {
            // Call to Masonry plugin
            var portfoliomasonry = $('#portfolio-masonry').isotope({
                itemSelector: '.single-item',
                layoutMode: 'masonry',
                transitionDuration: '.6s',
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(.85)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            });
        }

        // Filtering the portfolio items
        $('#portfolio-masonry-sort a').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            if ($this.parent('li').hasClass('active')) {
                return false;
            } else {
                $this.parent('li').addClass('active').siblings('li').removeClass('active');
            }
            var filterValue = $this.data('target');
            portfoliomasonry.isotope({ filter: filterValue });
            return $this;
        });

        // Magnific Popup Gallery
        //*******************
        $('.gallery-item').magnificPopup({
            fixedContentPos: false,
            type: 'image',
            gallery: {
                enabled: true
            },
            image: {
                // options for image content type
                titleSrc: 'title'
            }
        });
    });

    // iCheck for Checkboxes in Forms
    ////*******************
    //$(document).ready(function () {
    //    $('input').each(function () {
    //        var self = $(this),
    //            label = self.next(),
    //            label_text = label.text();

    //        label.remove();
    //        self.iCheck({
    //            checkboxClass: 'icheckbox_line-purple',
    //            radioClass: 'iradio_line-purple',
    //            insert: '<div class="icheck_line-icon"></div>' + label_text
    //        });
    //    });
    //});


    $("#toggled-but").click(function () {
        if ($('body').hasClass("noscroll")){
            $('body').removeClass('noscroll');
        }
        else {
                $('body').addClass('noscroll');
            }
    });

    $("#contact-form").on('submit',
        function (e) {
            e.preventDefault();
            var data = $(this).serialize();
            var url = $(this).prop("action");
            var form = this;
            
            $.post(url,
                data,
                function (resp) {
                    resp.success == true ?
                        $.alert({
                            content: "Your message was successfully sent. We will write your back soon!",
                            theme: "my-theme",
                            title: "",
                            backgroundDismiss: true,
                            onOpen: function () { $('body').addClass('noscroll'); },
                            onClose: function () { $('body').removeClass('noscroll'); }

                        })
                        :
                        $.alert({
                            content: "Sorry, we couldn't send your message. Try later!",
                            theme: "my-theme",
                            title: "",
                            backgroundDismiss: true,
                            onOpen: function () { $('body').addClass('noscroll'); },
                            onClose: function () { $('body').removeClass('noscroll');  }
                        });
                 
                    $(':input', form)
                        .not(':button, :submit, :reset, :hidden')
                        .val('')
                        .prop('checked', false)
                        .prop('selected', false);
                });
        });

    $("#navbar ul.nav li").on("click", function(e) {
        $("#navbar").collapse('hide');
        $('body').removeClass('noscroll');
    });



}(jQuery));