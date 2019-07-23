"use strict";
import React, { Component } from 'react'
import "./getInTouch.css"

import Contact from '../contact/contact';
var root = document.querySelector("#root");
var siteKey = root.getAttribute("data-key");
const captcha = [{id:1, name:"g-recaptcha-response-token", value:'' }, { id:2, name:"g-recaptcha-action", value:'' }, { id:3, name:"g-recaptcha-site-key", value:"@RecaptchaOptions.Value.SiteKey" }];


function GetTouch(props) {
    return (
        <React.Fragment>
        <h2 className={props.classF}>Get in touch</h2>
            <div className={props.classS}>
                I look forward to hearing from you and hope to be a part of your story. If you would like to enquire about my work or availability, please contact by filling out the blocks and I will reply you as soon as possible.
                    </div>
        </ React.Fragment>
        );
}


function GetInTouchContact() {
    return (
        <section className="module">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <GetTouch classF={"module-title align-center font-alt"} classS={"module-subtitle align-center font-inc"} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <Contact siteKey={siteKey} />
                    <div id="contact-response" className="ajax-response font-alt"></div>
                                </div>
            </div>
        </div>
    </section>
    );
}

function GetInTouchIndex() {
    return (

        <section className="module-small">

            <div className="container">

                <div className="row">


                    <div className="col-sm-6">
                        <GetTouch classF={"module-title text-left font-alt"} classS={"module-subtitle text-left font-inc"} />
                    </div>

                    <div className="col-sm-6">

                        <Contact siteKey={siteKey} />

                                    <div id="contact-response" className="ajax-response font-alt"></div>
                                </div>
                                
            
                </div>

            </div>

        </section>


                    );
}

function GetInTouch() {
    const getTouch=[];
   
    if (window.location.pathname == "/") {
        getTouch.push( <GetInTouchIndex key="11" />) ;
    } else {
        getTouch.push(<GetInTouchContact key="12" />);
    }
        return(getTouch);
}

export default GetInTouch;
