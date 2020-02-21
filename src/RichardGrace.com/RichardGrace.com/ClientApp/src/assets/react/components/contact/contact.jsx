import React, { Component } from 'react'
import Confirm from '../confirm/confirm';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            message: '',
            siteKey: props.siteKey
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.request = this.request.bind(this);
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    request = obj => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(obj.method || "GET", obj.url);
            if (obj.headers) {
                Object.keys(obj.headers).forEach(key => {
                    xhr.setRequestHeader(key, obj.headers[key]);
                });
            }
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(obj.body);
        });
    };


    componentDidMount() {

        var siteKey = document.querySelector("input[name=g-recaptcha-site-key]");
        var siteKeyValue = this.props.siteKey;

        var div = document.createElement('div');
        div.setAttribute('id', 'recaptcha-badge');
        div.setAttribute('class', 'lazyload');
        div.setAttribute('data-site-key', siteKeyValue);
        document.getElementById("contact-form").appendChild(div);

        document.addEventListener('lazybeforeunveil',
            function (e) {
                var siteKey = e.target.getAttribute('data-site-key');
                if (siteKey) {
                    var script = document.createElement('script');

                    script.async = true;
                    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoadCallback';

                    document.body.appendChild(script);
                }
            });

        window.onRecaptchaLoadCallback = function () {
            var siteKey = document.getElementById("recaptcha-badge").getAttribute('data-site-key');

            var clientId = grecaptcha.render('recaptcha-badge',
                {
                    'sitekey': siteKey,
                    'size': 'invisible'
                });
        }
    }

    handleSubmit(event) {
        var self = this;
        event.preventDefault();
        var form = document.querySelector('form');
        var siteAction = document.querySelector("input[name=g-recaptcha-action]");
        var siteToken = document.querySelector("input[name=g-recaptcha-response-token]");
        var widgetId = document.querySelector("#recaptcha-badge").dataset.widgetId;
        var submitButton = document.querySelector("input[name=submit]");

        submitButton.disabled = true;

        grecaptcha.execute(widgetId, {
            action: 'contact'
        }).then(function (token) {
            siteToken.value = token;
            siteAction.value = "contact";
        }).then(function () {
            var formatData = new FormData(form);
            return self.request({ method: "POST", url: "/api/send-feedback", body: formatData })
                .then(function (resp) {
                    resp = JSON.parse(resp);
                    (resp.success === true)
                        ? self.message = "Your message was successfully sent. We will write your back soon!"
                        : self.message = "Sorry, we couldn't send your message. Try later!";
                    submitButton.disabled = false;
                    self.togglePopup();
                    form.reset();
                });
        });
    }

    render() {
        return (
            <section id="rsvp" className="section-inner before-opacity white lazyload" data-bg="/img/bg/bg2.jpg">
                <div className="container">
                    <div className="row">
                        <div className="column column-md-offset-3 column-lg-offset-4 column-md-9 column-lg-8 column-1 text-center">
                            <h4>We are looking forward to seeing you!</h4>
                            <hr className="thin-hr light-hr" />
                            <form method="POST" asp-controller="Common" asp-action="SendFeedback" className="contact-form" id="contact-form" onSubmit={this.handleSubmit}>
                                <input type="hidden" name="g-recaptcha-action" />
                                <input type="hidden" name="g-recaptcha-response-token" />
                                <input type="hidden" name="g-recaptcha-site-key" value={this.props.siteKey} />
                                <input type="text" name="name" aria-label="Your name" maxLength="100" placeholder="Name" required />
                                <input type="email" name="email" placeholder="Email" id="email" required data-validation-required-message="Please enter your email address." aria-label="Email" />
                                <textarea name="comments" id="comments" placeholder="Your Message" required data-validation-required-message="Please enter a message." aria-label="Message"></textarea>
                                <input type="submit" name="submit" value="Submit" title="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.showPopup ? <Confirm message={this.message} closePopup={this.togglePopup} /> : null}
            </section>
        );
    }
}