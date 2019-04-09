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

$("#subscribe-form").on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    var url = $(this).prop("action");
    var form = this;
    $.post(url, data, function (resp) {
        resp.success == true ? $.alert({ content: "Thank you for subscribing us!", theme: "my-theme", title: "" }) : $.alert({ content: "Sorry, we couldn't send your message. Try later!", theme: "my-theme", title: "" });

        $(':input', form)
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);
    });
});
//$(document).ready(function () {
//    map = new GMaps({
//        scrollwheel: false,
//        el: '#markermap',
//        lat: -33.856784,
//        lng: 151.215297

//    });
//    map.addMarker({
//        lat: -33.856784,
//        lng: 151.215297,
//        title: 'Marker with InfoWindow',
//        infoWindow: {
//            content: '<h4>GUNJAN SOFTWARE</h4><p>A Small Web design Studio</p>'
//        }
//    });
//});
if ($.fn.countdown){
    var $clock = $('#clock'),
        untilDate = $clock.data('until-date');

    $clock.countdown(untilDate, function(e){
        $(this).html(e.strftime(''
            + '<div class="col-4 col-sm-2"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large text-right text-center">%D</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large text-center">Days</span></div>'
            + '<div class="col-4 col-sm-2"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large text-center">%H</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large text-center">Hours</span></div>'
            + '<div class="col-4 col-sm-2"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large text-center">%M</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large text-center">Minutes</span></div>'
            + '<div class="col-4 col-sm-2 d-none d-sm-block text-center"><span class="d-block font-alt letter-spacing-1 text-base-color text-uppercase title-large title-sm-extra-large title-lg-extra-large text-center">%S</span><span class="d-block font-alt2 text-gray-700 text-medium text-md-large text-center">Seconds</span></div>'));
    });
}