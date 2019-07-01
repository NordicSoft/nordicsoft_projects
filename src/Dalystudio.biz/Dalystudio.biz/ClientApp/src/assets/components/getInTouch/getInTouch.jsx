"use strict";
import React, { Component } from 'react'
import "./getInTouch.css"

const captcha = [{id:1, name:"g-recaptcha-response-token", value:'' }, { id:2, name:"g-recaptcha-action", value:'' }, { id:3, name:"g-recaptcha-site-key", value:"@RecaptchaOptions.Value.SiteKey" }];

function InputCaptcha() {
    const captchaArr = [];
    for (var k = 0; k < 3; k++) {
        captchaArr.push(<input key={captcha[k].id} type="hidden" name={captcha[k].name} value={captcha[k].value} />);
    }
    return(captchaArr);
}

function GetForm() {
    return (
        
        <form id="contact-form" role="form" asp-controller="Common" asp-action="SendFeedback" method="POST">
            <InputCaptcha />

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
                        <button type="submit" className="btn btn-round btn-g" title="submit">Submit</button>
                    </div>

            </form>
        );
}


function GetInTouch() {
    return (

        <section className="module-small">

            <div className="container">

                <div className="row">


                    <div className="col-sm-6">
                        <h2 className="module-title text-left font-alt">Get in touch</h2>
                        <div className="module-subtitle text-left font-inc">
                            I look forward to hearing from you and hope to be a part of your story. If you would like to enquire about my work, please contact me by filling out the blocks and I will reply you as soon as possible.
                        </div>
                    </div>

                    <div className="col-sm-6">

                        <GetForm />

                                    <div id="contact-response" className="ajax-response font-alt"></div>
                                </div>
                                
            
                </div>

            </div>

        </section>


                    );
                }
                
export default GetInTouch;
