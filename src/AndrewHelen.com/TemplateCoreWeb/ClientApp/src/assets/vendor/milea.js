$("#contact-form").on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    var url = $(this).prop("action");
    var form = this;
    $.post(url, data,function (resp) {
        resp.success == true ? $.alert({ content: "Your message was successfully sent. We will write your back soon!", theme: "my-theme", title: "" }) : $.alert({ content: "Sorry, we couldn't send your message. Try later!", theme: "my-theme", title: "" });

        $(':input', form)
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);
    });
});