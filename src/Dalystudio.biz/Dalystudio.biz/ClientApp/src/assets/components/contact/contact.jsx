import React, { Component } from 'react'
import Confirm from '../confirm/confirm.jsx';
import '../confirm/confirm.css';

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            message: '',
            siteKey: props.siteKey,
            widgetId: ''
        };
        this.grecaptchaId =`recaptcha-badge-${new Date().getTime()}`;
        this._isMounted = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.request = this.request.bind(this);
    }
    togglePopup() {
        this._isMounted && this.setState({
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
        this._isMounted = true;
        var siteKey = document.querySelector("input[name=g-recaptcha-site-key]");
        var siteKeyValue = this.props.siteKey;

        var div = document.createElement('div');
        div.setAttribute('id', this.grecaptchaId);
        div.setAttribute('class', 'lazyload');
        div.setAttribute('data-site-key', this.state.siteKey);
        document.body.appendChild(div);

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

        var self  = this;

        window.onRecaptchaLoadCallback = function () {
            var siteKey = document.getElementById(self.grecaptchaId).getAttribute('data-site-key');

            var clientId = grecaptcha.render(self.grecaptchaId,
                {
                    'sitekey': siteKey,
                    'size': 'invisible'
                });

            self._isMounted && self.setState({ widgetId: clientId });

            document.getElementById(self.grecaptchaId).setAttribute('data-widget-id', clientId);
            console.log(self.state.widgetId);
        }
      //  console.log(this.state.widgetId);

    }

    componentWillUnmount() {
        this.state.widgetId !== "" && grecaptcha.reset(this.state.widgetId);
        document.getElementById(this.grecaptchaId).remove();
        
        this._isMounted = false;
        //clientId = undefined;
    }

    handleSubmit(event) {
        var self = this;
        event.preventDefault();
        var form = document.querySelector('form');
      //  var siteKey = document.querySelector("input[name=g-recaptcha-site-key]");
        var siteAction = document.querySelector("input[name=g-recaptcha-action]");
        var siteToken = document.querySelector("input[name=g-recaptcha-response-token]");
        var widgetId = document.getElementById(this.grecaptchaId).dataset.widgetId;

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
            <section>
            <form id="contact-form" role="form" asp-controller="Common" asp-action="SendFeedback" method="POST" onSubmit={this.handleSubmit}>
                    <input type="hidden" name="g-recaptcha-action" />
                    <input type="hidden" name="g-recaptcha-response-token" />
                    <input type="hidden" name="g-recaptcha-site-key" value={this.props.siteKey} />
                <div className="form-group">
                    <input type="text" tabIndex="0" id="cname" name="cname" className="form-control" placeholder="Name" required="" data-validation-required-message="Please enter your name." aria-invalid="false" aria-label="your name" />
                    <p className="help-block text-danger"></p>
                </div>

                <div className="form-group">
                    <input type="email" tabIndex="0" id="cemail" name="cemail" className="form-control" placeholder="Your E-mail" required="" data-validation-required-message="Please enter your email address." aria-label="your email" />
                    <p className="help-block text-danger"></p>
                </div>

                <div className="form-group">
                    <textarea className="form-control" tabIndex="0" id="cmessage" name="cmessage" rows="7" placeholder="Message" required="" data-validation-required-message="Please enter your message." aria-label="your message"></textarea>
                    <p className="help-block text-danger"></p>
                </div>
                <div className=" text-right">
                    <input type="submit" className="btn btn-round btn-g" name="submit" value="Submit" title="Submit" />
                </div>
              
            </form>
                {this.state.showPopup ? <Confirm message={this.message} closePopup={this.togglePopup} /> : null}
            </section>
        );
    }
}