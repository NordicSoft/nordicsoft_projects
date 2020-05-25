"use strict";
import React from 'react'
import GetInTouchIndex from './getInTouchIndex'
import GetInTouchContact from './getInTouchContact'
import "./getInTouch.css"

//import Contact from '../contact/contact';
//var root = document.querySelector("#root");
var siteKey = root.getAttribute("data-key");
//const captcha = [{id:1, name:"g-recaptcha-response-token", value:'' }, { id:2, name:"g-recaptcha-action", value:'' }, { id:3, name:"g-recaptcha-site-key", value:"@RecaptchaOptions.Value.SiteKey" }];

function GetInTouch() {
    const getTouch=[];
   
    if (window.location.pathname == "/") {
        getTouch.push(<GetInTouchIndex key="11" siteKey={siteKey} />);
    } else {
        getTouch.push(<GetInTouchContact key="12" siteKey={siteKey} />);
    }
        return(getTouch);
}

export default GetInTouch;
