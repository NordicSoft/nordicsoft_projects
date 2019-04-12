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
        var data = $(this).serialize();
        var url = $(this).prop("action");
        var form = this;
        $.post(url,
            data,
            function (resp) {
                resp.success == true
                    ? $.alert({ content: "Your message was successfully sent. We will write your back soon!", theme: "my-theme", title: "" })
                    : $.alert({ content: "Sorry, we couldn't send your message. Try later!", theme: "my-theme", title: "" });

                $(':input', form)
                    .not(':button, :submit, :reset, :hidden')
                    .val('')
                    .prop('checked', false)
                    .prop('selected', false);
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
});

/** Window load */
$(window).load(function () {
    'use strict';
    /* CONFETTI JS */
    var canvas = Confetti.createCanvas(
        document.querySelector('div'),
        document.querySelector('canvas#fettiwrap')
    );

    var config = {
        angle: 0.01,
        tiltAngle: 0.5,
        draw: draw,
        updatePosition: updatePosition,
        updateState: updateState
    };

    var particles = _.range(0, Confetti.DEFAULT_NUM).map(function () {
        return Confetti.create({
            x: Confetti.randomFrom(0, canvas.width),
            y: 0,
            r: Confetti.randomFrom(5, 30),
            tilt: Confetti.randomFrom(-10, 0),
            tiltAngle: 0,
            tiltAngleIncrement: Confetti.randomFrom(0.05, 0.12, 100)
        });
    });

    canvas.step(particles, config)();

    function draw(confetti) {
        canvas.context.beginPath();
        canvas.context.lineWidth = confetti.r / 2;
        canvas.context.strokeStyle = confetti.color;
        canvas.context.moveTo(confetti.x + confetti.tilt + (confetti.r / 4),
            confetti.y);
        canvas.context.lineTo(confetti.x + confetti.tilt, confetti.y +
            confetti.tilt + (confetti.r / 4));
        canvas.context.stroke();
    }

    function updatePosition(confetti, idx) {
        confetti.tiltAngle += confetti.tiltAngleIncrement;
        confetti.y += (Math.cos(config.angle + confetti.d) + 1 + confetti.r / 2) / 2;
        confetti.x += Math.sin(config.angle);
        confetti.tilt = 15 * Math.sin(confetti.tiltAngle - idx / 3);

        if (confetti.isFlakeExiting(canvas)) {
            if (idx % 5 > 0 || idx % 2 === 0) {
                confetti.x = Confetti.randomFrom(0, canvas.width);
                confetti.y = -10;
                confetti.tilt = Confetti.randomFrom(-10, 0);

            } else {
                if (Math.sin(config.angle) > 0) {
                    confetti.x = -5;
                    confetti.y = Confetti.randomFrom(0, canvas.height);
                    confetti.tilt = Confetti.randomFrom(-10, 0);
                } else {
                    confetti.x = canvas.width + 5;
                    confetti.y = Confetti.randomFrom(0, canvas.height);
                    confetti.tilt = Confetti.randomFrom(-10, 0);
                }
            }
        }
    }

    function updateState() {
        this.angle += 0.01;
        this.tiltAngle += 0.1;
    }
});